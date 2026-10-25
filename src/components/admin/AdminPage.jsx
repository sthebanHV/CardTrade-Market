import { useEffect, useState, useCallback } from 'react';
import {
  Box, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Button, Chip, Stack,
  MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, Card, CardContent, CircularProgress, Alert, Pagination, Tooltip,
} from '@mui/material';
import {
  Block as BlockIcon, CheckCircle as CheckIcon, Security as RoleIcon,
  Gavel as AuditIcon, BarChart as StatsIcon, People as PeopleIcon,
  Report as ReportIcon, Undo as UndoIcon,
} from '@mui/icons-material';
import { adminAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const fecha = (iso) => (iso ? new Date(iso).toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—');

const TabPanel = ({ children, value, index }) =>
  value === index ? <Box sx={{ pt: 2.5 }}>{children}</Box> : null;

export const AdminPage = () => {
  const user = useStore((s) => s.user);
  const showToast = useStore((s) => s.showToast);
  const [tab, setTab] = useState(0);
  const esAdmin = user?.role === 'ROLE_ADMIN';

  // Usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  const [cargandoUsers, setCargandoUsers] = useState(false);

  // Reportes
  const [reportes, setReportes] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState('PENDIENTE');
  const [resolver, setResolver] = useState(null);
  const [notaResolve, setNotaResolve] = useState('');

  // Stats
  const [stats, setStats] = useState(null);

  // Auditoría
  const [auditoria, setAuditoria] = useState([]);

  const cargarUsuarios = useCallback(async () => {
    setCargandoUsers(true);
    try {
      const data = await adminAPI.users({ q, rol: rolFiltro, page: page - 1, size: 10 });
      setUsuarios(data.items || []);
      setTotalUsers(data.total || 0);
    } catch {
      showToast({ message: 'No se pudieron cargar los usuarios', severity: 'error' });
    } finally {
      setCargandoUsers(false);
    }
  }, [q, rolFiltro, page]);

  useEffect(() => {
    if (esAdmin) cargarUsuarios();
  }, [esAdmin, cargarUsuarios]);

  useEffect(() => {
    if (!esAdmin) return;
    if (tab === 1) adminAPI.reports(estadoFiltro === 'TODOS' ? undefined : estadoFiltro)
      .then(setReportes).catch(() => setReportes([]));
    if (tab === 2) adminAPI.stats().then(setStats).catch(() => {});
    if (tab === 3) adminAPI.audit().then(setAuditoria).catch(() => setAuditoria([]));
  }, [esAdmin, tab, estadoFiltro]);

  const cambiarRol = async (u, rol) => {
    try {
      await adminAPI.setRole(u.id, rol);
      showToast({ message: `Rol de ${u.username} actualizado`, severity: 'success' });
      cargarUsuarios();
    } catch (e) {
      showToast({ message: e.response?.data?.error || 'No se pudo cambiar el rol', severity: 'error' });
    }
  };

  const cambiarStatus = async (u, status) => {
    try {
      await adminAPI.setStatus(u.id, status);
      showToast({ message: `${u.username} ahora está ${status.toLowerCase()}`, severity: 'success' });
      cargarUsuarios();
    } catch (e) {
      showToast({ message: e.response?.data?.error || 'No se pudo cambiar el estado', severity: 'error' });
    }
  };

  const confirmarResolver = async () => {
    try {
      await adminAPI.resolveReport(resolver.id, resolver.estado, notaResolve);
      showToast({ message: 'Reporte resuelto', severity: 'success' });
      setResolver(null);
      setNotaResolve('');
      adminAPI.reports(estadoFiltro === 'TODOS' ? undefined : estadoFiltro).then(setReportes).catch(() => {});
    } catch (e) {
      showToast({ message: e.response?.data?.error || 'No se pudo resolver', severity: 'error' });
    }
  };

  if (!esAdmin) {
    return <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>Acceso restringido a administradores.</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Panel de administración</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de usuarios, reportes, estadísticas y auditoría · US-47
      </Typography>

      <Paper variant="outlined" sx={{ borderRadius: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile>
          <Tab icon={<PeopleIcon />} label="Usuarios" iconPosition="start" />
          <Tab icon={<ReportIcon />} label="Reportes" iconPosition="start" />
          <Tab icon={<StatsIcon />} label="Estadísticas" iconPosition="start" />
          <Tab icon={<AuditIcon />} label="Auditoría" iconPosition="start" />
        </Tabs>

        {/* ===== Usuarios ===== */}
        <TabPanel value={tab} index={0}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ px: 3, mb: 2 }}>
            <TextField size="small" fullWidth label="Buscar por nombre, usuario o email" value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }} />
            <TextField size="small" select label="Rol" value={rolFiltro} sx={{ minWidth: 170 }}
              onChange={(e) => { setRolFiltro(e.target.value); setPage(1); }}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="ROLE_USER">Usuario</MenuItem>
              <MenuItem value="ROLE_ADMIN">Administrador</MenuItem>
            </TextField>
            <Button variant="outlined" onClick={cargarUsuarios}>Buscar</Button>
          </Stack>

          <TableContainer sx={{ px: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Act.</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cargandoUsers ? (
                  <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={24} /></TableCell></TableRow>
                ) : usuarios.length === 0 ? (
                  <TableRow><TableCell colSpan={6} align="center">Sin resultados</TableCell></TableRow>
                ) : usuarios.map((u) => {
                  const soyYo = u.id === user?.id;
                  return (
                    <TableRow key={u.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{u.username}</Typography>
                          <Typography variant="caption" color="text.secondary">{u.nombre}</Typography>
                          {soyYo && <Chip label="Tú" size="small" color="primary" />}
                        </Stack>
                      </TableCell>
                      <TableCell><Typography variant="caption">{u.email}</Typography></TableCell>
                      <TableCell>
                        <Chip size="small" label={u.role === 'ROLE_ADMIN' ? 'Admin' : 'Usuario'}
                          color={u.role === 'ROLE_ADMIN' ? 'warning' : 'default'} />
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={u.status || 'ACTIVO'}
                          color={u.status === 'SUSPENDIDO' ? 'error' : 'success'} variant="outlined" />
                      </TableCell>
                      <TableCell align="right">{u.publicacionesActivas}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Tooltip title="Cambiar rol">
                            <span>
                              <IconButton size="small" disabled={soyYo}
                                onClick={() => cambiarRol(u, u.role === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN')}>
                                <RoleIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title={u.status === 'SUSPENDIDO' ? 'Reactivar' : 'Suspender'}>
                            <span>
                              <IconButton size="small" color={u.status === 'SUSPENDIDO' ? 'success' : 'error'}
                                disabled={soyYo}
                                onClick={() => cambiarStatus(u, u.status === 'SUSPENDIDO' ? 'ACTIVO' : 'SUSPENDIDO')}>
                                {u.status === 'SUSPENDIDO' ? <UndoIcon fontSize="small" /> : <BlockIcon fontSize="small" />}
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="center" sx={{ py: 2 }}>
            <Pagination count={Math.max(1, Math.ceil(totalUsers / 10))} page={page}
              onChange={(_, v) => setPage(v)} color="primary" />
          </Stack>
        </TabPanel>

        {/* ===== Reportes ===== */}
        <TabPanel value={tab} index={1}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ px: 3, mb: 2 }}>
            <TextField size="small" select label="Estado" value={estadoFiltro} sx={{ minWidth: 200 }}
              onChange={(e) => setEstadoFiltro(e.target.value)}>
              {['PENDIENTE', 'DESCARTADO', 'OCULTO', 'SUSPENDIDO', 'RESUELTO', 'TODOS'].map((s) =>
                <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Stack>
          {reportes.length === 0 ? (
            <Box sx={{ px: 3, pb: 3 }}><Alert severity="info">No hay reportes con ese estado.</Alert></Box>
          ) : (
            <TableContainer sx={{ px: 2, pb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Motivo</TableCell>
                    <TableCell>Carta</TableCell>
                    <TableCell>Detalles</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportes.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell><Typography variant="caption">{fecha(r.fecha)}</Typography></TableCell>
                      <TableCell><Chip size="small" label={r.motivo} color="error" variant="outlined" /></TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.card?.nombre || '—'}</Typography>
                        <Typography variant="caption" color="text.secondary">vendedor: {r.card?.vendedorId?.slice(0, 8) || '—'}</Typography>
                      </TableCell>
                      <TableCell><Typography variant="caption">{r.detalles || '—'}</Typography></TableCell>
                      <TableCell>
                        <Chip size="small"
                          label={r.estado}
                          color={r.estado === 'PENDIENTE' ? 'warning' : r.estado === 'DESCARTADO' ? 'default' : 'success'} />
                      </TableCell>
                      <TableCell align="right">
                        {r.estado === 'PENDIENTE' && (
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <Button size="small" onClick={() => { setResolver({ id: r.id, estado: 'DESCARTADO' }); setNotaResolve(''); }}>
                              Descartar
                            </Button>
                            <Button size="small" color="warning" onClick={() => { setResolver({ id: r.id, estado: 'OCULTO' }); setNotaResolve(''); }}>
                              Ocultar carta
                            </Button>
                            <Button size="small" color="error" onClick={() => { setResolver({ id: r.id, estado: 'SUSPENDIDO' }); setNotaResolve(''); }}>
                              Suspender vendedor
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>

        {/* ===== Estadísticas ===== */}
        <TabPanel value={tab} index={2}>
          {!stats ? (
            <Stack alignItems="center" sx={{ py: 4 }}><CircularProgress /></Stack>
          ) : (
            <Box sx={{ px: 3, pb: 3 }}>
              <Grid container spacing={2}>
                {[
                  { label: 'Usuarios', value: stats.usuarios, sub: `+${stats.usuariosNuevos30d} en 30d` },
                  { label: 'Cartas publicadas', value: stats.cartasPublicadas, sub: `${stats.cartasVendidas} vendidas` },
                  { label: 'Órdenes', value: stats.ordenes, sub: fmt(stats.ingresos) },
                  { label: 'Reportes pendientes', value: stats.reportesPendientes, sub: `${stats.usuariosSuspendidos} suspendidos` },
                ].map((t) => (
                  <Grid item xs={6} md={3} key={t.label}>
                    <Card variant="outlined" sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">{t.label}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{t.value}</Typography>
                        <Typography variant="caption" color="text.secondary">{t.sub}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Ventas · últimos 30 días</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, height: 140 }}>
                        {stats.serie30d.map((d) => {
                          const max = Math.max(...stats.serie30d.map((x) => x.ventas), 1);
                          return (
                            <Tooltip key={d.fecha} title={`${d.fecha}: ${d.ventas} orden(es) · ${fmt(d.ingresos)}`}>
                              <Box sx={{
                                flexGrow: 1, bgcolor: 'primary.main', borderRadius: 1,
                                height: Math.max(4, (d.ventas / max) * 130),
                                opacity: d.ventas === 0 ? 0.25 : 1,
                              }} />
                            </Tooltip>
                          );
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Top juegos</Typography>
                      {stats.topJuegos.map((j) => (
                        <Stack key={j.juego} direction="row" justifyContent="space-between" sx={{ py: 0.5 }}>
                          <Typography variant="body2">{j.juego}</Typography>
                          <Chip size="small" label={j.cantidad} />
                        </Stack>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Top vendedores</Typography>
                      {stats.topVendedores.length === 0 && (
                        <Typography variant="caption" color="text.secondary">Sin ventas aún.</Typography>
                      )}
                      {stats.topVendedores.map((v) => (
                        <Stack key={v.username} direction="row" justifyContent="space-between" sx={{ py: 0.5 }}>
                          <Typography variant="body2">{v.username}</Typography>
                          <Typography variant="caption" color="text.secondary">{fmt(v.monto)}</Typography>
                        </Stack>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </TabPanel>

        {/* ===== Auditoría ===== */}
        <TabPanel value={tab} index={3}>
          <Box sx={{ px: 3, pb: 3 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Registro inmutable de acciones administrativas (últimas 100 entradas).
            </Alert>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Acción</TableCell>
                    <TableCell>Objetivo</TableCell>
                    <TableCell>Detalle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auditoria.length === 0 ? (
                    <TableRow><TableCell colSpan={5} align="center">Sin acciones registradas</TableCell></TableRow>
                  ) : auditoria.map((a) => (
                    <TableRow key={a.id} hover>
                      <TableCell><Typography variant="caption">{fecha(a.fecha)}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{a.adminUsername}</Typography></TableCell>
                      <TableCell><Chip size="small" label={a.accion} color="primary" variant="outlined" /></TableCell>
                      <TableCell><Typography variant="caption">{a.objetivoTipo} · {a.objetivoId?.slice(0, 8)}</Typography></TableCell>
                      <TableCell><Typography variant="caption">{a.detalle}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>
      </Paper>

      {/* Resolver reporte */}
      <Dialog open={!!resolver} onClose={() => setResolver(null)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {resolver?.estado === 'DESCARTADO' && 'Descartar reporte'}
          {resolver?.estado === 'OCULTO' && 'Ocultar carta'}
          {resolver?.estado === 'SUSPENDIDO' && 'Suspender vendedor'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {resolver?.estado === 'OCULTO' && 'La carta pasará a estado PAUSADO y dejará de mostrarse.'}
            {resolver?.estado === 'SUSPENDIDO' && 'El vendedor de la carta será suspendido y no podrá iniciar sesión.'}
            {resolver?.estado === 'DESCARTADO' && 'El reporte se cerrará sin acción sobre la publicación.'}
          </Typography>
          <TextField label="Nota (opcional)" fullWidth multiline minRows={2} value={notaResolve}
            onChange={(e) => setNotaResolve(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResolver(null)}>Cancelar</Button>
          <Button variant="contained" color={resolver?.estado === 'DESCARTADO' ? 'primary' : 'error'}
            onClick={confirmarResolver}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
