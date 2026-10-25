import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Paper, Typography, Button, Stack, Chip, Tabs, Tab, IconButton, Menu, MenuItem,
  ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress, Divider, Badge,
} from '@mui/material';
import {
  MoreVert as MoreIcon, PauseCircle as PauseIcon, PlayCircle as PlayIcon,
  Sell as SoldIcon, Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon,
  RemoveRedEye as EyeIcon,
} from '@mui/icons-material';
import { cardsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const ESTADOS = {
  PUBLICADO: { label: 'Activa', color: 'success' },
  PAUSADO: { label: 'Pausada', color: 'warning' },
  VENDIDO: { label: 'Vendida', color: 'default' },
  RESERVADO: { label: 'Reservada', color: 'info' },
  INACTIVO: { label: 'Inactiva', color: 'error' },
};

const FILTROS = [
  { key: 'todas', label: 'Todas' },
  { key: 'activas', label: 'Activas' },
  { key: 'pausadas', label: 'Pausadas' },
  { key: 'vendidas', label: 'Vendidas' },
];

const fmt = (n) => (n == null ? '—' : Number(n).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }));

export const MyListingsPage = () => {
  const showToast = useStore((s) => s.showToast);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('todas');
  const [error, setError] = useState('');

  const [menu, setMenu] = useState(null); // {anchor, item}
  const [precioDialog, setPrecioDialog] = useState(null); // {item, valor}
  const [confirmar, setConfirmar] = useState(null); // {item, accion}

  const cargar = useCallback(async () => {
    try {
      const data = await cardsAPI.myListings();
      setItems(data || []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.error || 'No se pudieron cargar tus publicaciones');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const stats = {
    todas: items.length,
    activas: items.filter((i) => i.status === 'PUBLICADO').length,
    pausadas: items.filter((i) => i.status === 'PAUSADO').length,
    vendidas: items.filter((i) => i.status === 'VENDIDO').length,
  };

  const visibles = filtro === 'todas' ? items : items.filter((i) => {
    if (filtro === 'activas') return i.status === 'PUBLICADO';
    if (filtro === 'pausadas') return i.status === 'PAUSADO';
    if (filtro === 'vendidas') return i.status === 'VENDIDO';
    return true;
  });

  const cerrarMenu = () => setMenu(null);

  const cambiarEstado = async (item, status) => {
    cerrarMenu();
    try {
      await cardsAPI.setStatus(item.id, status);
      showToast({ message: status === 'PAUSADO' ? 'Publicación pausada' : 'Publicación activada', severity: 'success' });
      cargar();
    } catch (err) {
      showToast({ message: err?.response?.data?.error || 'No se pudo cambiar el estado', severity: 'error' });
    }
  };

  const guardarPrecio = async () => {
    const precio = Number(precioDialog.valor);
    if (!precio || precio <= 0) return;
    try {
      await cardsAPI.setPrice(precioDialog.item.id, precio);
      showToast({ message: 'Precio actualizado', severity: 'success' });
      setPrecioDialog(null);
      cargar();
    } catch (err) {
      showToast({ message: err?.response?.data?.error || 'No se pudo actualizar el precio', severity: 'error' });
    }
  };

  const ejecutarConfirmacion = async () => {
    const { item, accion } = confirmar;
    try {
      if (accion === 'vender') {
        await cardsAPI.markSold(item.id);
        showToast({ message: '¡Venta registrada!', severity: 'success' });
      } else if (accion === 'eliminar') {
        await cardsAPI.remove(item.id);
        showToast({ message: 'Publicación eliminada', severity: 'success' });
      }
      setConfirmar(null);
      cargar();
    } catch (err) {
      showToast({ message: err?.response?.data?.error || 'No se pudo completar la acción', severity: 'error' });
    }
  };

  if (cargando) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Mis publicaciones</Typography>
        <Button component={RouterLink} to="/sell/new" variant="contained">+ Publicar carta</Button>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ my: 2.5, flexWrap: 'wrap', gap: 1 }}>
        {[
          ['Total', stats.todas, 'primary'],
          ['Activas', stats.activas, 'success'],
          ['Pausadas', stats.pausadas, 'warning'],
          ['Vendidas', stats.vendidas, 'default'],
        ].map(([label, valor, color]) => (
          <Paper key={label} variant="outlined" sx={{ px: 2.5, py: 1.25, borderRadius: 3, minWidth: 110 }}>
            <Typography variant="h5" color={`${color}.main`} sx={{ fontWeight: 800 }}>{valor}</Typography>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
          </Paper>
        ))}
      </Stack>

      <Tabs value={filtro} onChange={(e, v) => setFiltro(v)} sx={{ mb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        {FILTROS.map((f) => (
          <Tab key={f.key} value={f.key} label={`${f.label} (${stats[f.key]})`} />
        ))}
      </Tabs>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {visibles.length === 0 && (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>No hay publicaciones aquí</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {filtro === 'todas' ? 'Publica tu primera carta para empezar a vender.' : 'Prueba con otro filtro.'}
          </Typography>
          <Button component={RouterLink} to="/sell/new" variant="contained" sx={{ mt: 2 }}>
            Publicar carta
          </Button>
        </Paper>
      )}

      <Stack spacing={1.5}>
        {visibles.map((item) => {
          const est = ESTADOS[item.status] || ESTADOS.PUBLICADO;
          const src = item.imagenes?.[0] || 'https://placehold.co/96x96?text=Sin';
          const enOferta = item.precioAnterior != null && item.precioAnterior > item.precio;
          return (
            <Paper key={item.id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box component="img" src={src} alt={item.nombre}
                  sx={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography sx={{ fontWeight: 700 }} noWrap>{item.nombre}</Typography>
                    <Chip size="small" label={est.label} color={est.color} sx={{ fontWeight: 700 }} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.tipo}{item.edition ? ` · ${item.edition}` : ''}{item.condition ? ` · ${item.condition}` : ''}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <EyeIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">{item.vistas ?? 0} vistas</Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {item.fechaActualizacion || item.fechaPublicacion
                        ? new Date(item.fechaActualizacion || item.fechaPublicacion).toLocaleDateString('es')
                        : ''}
                    </Typography>
                  </Stack>
                </Box>
                <Stack alignItems="flex-end" spacing={0.5}>
                  <Typography sx={{ fontWeight: 800 }}>{fmt(item.precio)}</Typography>
                  {enOferta && (
                    <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      {fmt(item.precioAnterior)}
                    </Typography>
                  )}
                </Stack>
                <IconButton onClick={(e) => setMenu({ anchor: e.currentTarget, item })} aria-label="Acciones">
                  <MoreIcon />
                </IconButton>
              </Stack>
            </Paper>
          );
        })}
      </Stack>

      <Menu anchorEl={menu?.anchor} open={Boolean(menu)} onClose={cerrarMenu}>
        <MenuItem component={RouterLink} to={`/cards/${menu?.item?.id}`} onClick={cerrarMenu}>
          <ListItemIcon><ViewIcon fontSize="small" /></ListItemIcon><ListItemText>Ver publicación</ListItemText>
        </MenuItem>
        {menu?.item?.status !== 'VENDIDO' && (
          <>
            <MenuItem onClick={() => {
              const item = menu.item;
              cerrarMenu();
              setPrecioDialog({ item, valor: String(item.precio ?? '') });
            }}>
              <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon><ListItemText>Editar precio</ListItemText>
            </MenuItem>
            {menu?.item?.status === 'PUBLICADO' ? (
              <MenuItem onClick={() => cambiarEstado(menu.item, 'PAUSADO')}>
                <ListItemIcon><PauseIcon fontSize="small" /></ListItemIcon><ListItemText>Pausar</ListItemText>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => cambiarEstado(menu.item, 'PUBLICADO')}>
                <ListItemIcon><PlayIcon fontSize="small" /></ListItemIcon><ListItemText>Activar</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={() => { const item = menu.item; cerrarMenu(); setConfirmar({ item, accion: 'vender' }); }}>
              <ListItemIcon><SoldIcon fontSize="small" /></ListItemIcon><ListItemText>Marcar como vendida</ListItemText>
            </MenuItem>
          </>
        )}
        <Divider />
        <MenuItem sx={{ color: 'error.main' }} onClick={() => { const item = menu.item; cerrarMenu(); setConfirmar({ item, accion: 'eliminar' }); }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon><ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      {/* Editar precio (US-21) */}
      <Dialog open={Boolean(precioDialog)} onClose={() => setPrecioDialog(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Editar precio</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {precioDialog?.item?.nombre}
          </Typography>
          {precioDialog?.item?.precioAnterior != null && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Precio anterior registrado: {fmt(precioDialog.item.precioAnterior)}
            </Alert>
          )}
          <TextField
            label="Nuevo precio (MXN)"
            type="number"
            value={precioDialog?.valor ?? ''}
            onChange={(e) => setPrecioDialog({ ...precioDialog, valor: e.target.value })}
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrecioDialog(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarPrecio}>Guardar precio</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmar acción (US-22 / eliminar) */}
      <Dialog open={Boolean(confirmar)} onClose={() => setConfirmar(null)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {confirmar?.accion === 'vender' ? '¿Marcar como vendida?' : '¿Eliminar publicación?'}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            {confirmar?.accion === 'vender'
              ? `La publicación "${confirmar?.item?.nombre}" pasará al estado Vendida y saldrá del catálogo. Esta acción no se puede deshacer.`
              : `Se eliminará "${confirmar?.item?.nombre}" de forma permanente. Esta acción no se puede deshacer.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmar(null)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={ejecutarConfirmacion}>
            {confirmar?.accion === 'vender' ? 'Sí, marcar vendida' : 'Sí, eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
