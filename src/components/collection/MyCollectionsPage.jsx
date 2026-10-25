import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, Grid,
  CircularProgress, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, List, ListItem, ListItemText,
  Radio, Divider,
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  CollectionsBookmark as CollectionIcon,
} from '@mui/icons-material';
import { collectionAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const VACIO = { nombre: '', descripcion: '' };

export const MyCollectionsPage = () => {
  const showToast = useStore((s) => s.showToast);
  const [colecciones, setColecciones] = useState([]);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState(null); // {modo:'crear'|'editar'|'agregar', col}
  const [form, setForm] = useState(VACIO);
  const [eliminando, setEliminando] = useState(null);
  const [agregandoA, setAgregandoA] = useState(null); // colección abierta para agregar
  const [elegida, setElegida] = useState(null); // cardId elegido en dialog agregar

  const cargar = () => {
    setCargando(true);
    Promise.all([collectionAPI.list(), collectionAPI.items()])
      .then(([cols, its]) => { setColecciones(cols); setItems(its); })
      .catch(() => setError('No se pudieron cargar tus colecciones.'))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  const abrirCrear = () => { setForm(VACIO); setDialog({ modo: 'crear' }); };
  const abrirEditar = (c) => { setForm({ nombre: c.name || '', descripcion: c.description || '' }); setDialog({ modo: 'editar', col: c }); };

  const guardar = async () => {
    if (!form.nombre.trim()) return;
    try {
      if (dialog.modo === 'crear') await collectionAPI.create(form.nombre.trim(), form.descripcion);
      else await collectionAPI.update(dialog.col.id, form.nombre.trim(), form.descripcion);
      setDialog(null);
      showToast({ message: 'Colección guardada', severity: 'success' });
      cargar();
    } catch (e) {
      showToast({ message: 'No se pudo guardar', severity: 'error' });
    }
  };

  const eliminar = async () => {
    try {
      await collectionAPI.remove(eliminando.id);
      showToast({ message: 'Colección eliminada (las cartas siguen en tu colección principal)', severity: 'success' });
      cargar();
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    } finally {
      setEliminando(null);
    }
  };

  const quitarCarta = async (col, cardId) => {
    try {
      await collectionAPI.removeCard(col.id, cardId);
      cargar();
    } catch {
      showToast({ message: 'No se pudo quitar la carta', severity: 'error' });
    }
  };

  const agregarCarta = async () => {
    if (!elegida || !agregandoA) return;
    try {
      await collectionAPI.addCard(agregandoA.id, elegida);
      setAgregandoA(null);
      setElegida(null);
      showToast({ message: 'Carta agregada a la colección', severity: 'success' });
      cargar();
    } catch (e) {
      const d = e.response?.data;
      showToast({ message: (typeof d === 'string' && d) || d?.error || 'No se pudo agregar', severity: 'error' });
    }
  };

  const itemsPorId = useMemo(() => {
    const m = {};
    items.forEach((i) => { m[i.cardId] = i; });
    return m;
  }, [items]);

  if (cargando) return <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Mis colecciones</Typography>
          <Typography variant="body2" color="text.secondary">
            Colecciones temáticas (US-33) · Tu colección principal está en{' '}
            <Link to="/my-collection">Mi colección</Link>
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={abrirCrear}>Nueva colección</Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {colecciones.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <CollectionIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>No tienes colecciones temáticas</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Crea carpetas como “Favoritos”, “Para vender” o “Raras” para organizar tus cartas.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={abrirCrear}>Crear la primera</Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {colecciones.map((c) => {
            const ids = c.cardIds || [];
            return (
              <Grid item xs={12} md={6} key={c.id}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 800 }}>{c.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {c.description || 'Sin descripción'}
                      </Typography>
                      <Chip label={`${ids.length} carta${ids.length !== 1 ? 's' : ''}`} size="small" sx={{ mt: 1 }} />
                    </Box>
                    <Stack direction="row">
                      <IconButton size="small" onClick={() => abrirEditar(c)}><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => setEliminando(c)}><DeleteIcon fontSize="small" /></IconButton>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  {ids.length === 0 ? (
                    <Typography variant="caption" color="text.secondary">Sin cartas todavía.</Typography>
                  ) : (
                    <List dense disablePadding>
                      {ids.map((cid) => {
                        const item = itemsPorId[cid];
                        return (
                          <ListItem key={cid} disableGutters
                            secondaryAction={
                              <IconButton size="small" color="error" onClick={() => quitarCarta(c, cid)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            }>
                            <ListItemText
                              primary={
                                <Typography variant="body2" component={Link} to={`/cards/${cid}`}
                                  style={{ fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>
                                  {item?.nombre || 'Ver carta'}
                                </Typography>
                              }
                              secondary={item?.juego || ''}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  )}

                  <Button size="small" startIcon={<AddIcon />} sx={{ mt: 1 }}
                    onClick={() => { setAgregandoA(c); setElegida(null); }}>
                    Agregar carta
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Crear/editar colección */}
      <Dialog open={!!dialog} onClose={() => setDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog?.modo === 'crear' ? 'Nueva colección' : 'Editar colección'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Nombre *" fullWidth autoFocus value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            <TextField label="Descripción" fullWidth multiline minRows={2} value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar} disabled={!form.nombre.trim()}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Agregar carta a colección */}
      <Dialog open={!!agregandoA} onClose={() => setAgregandoA(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar carta a “{agregandoA?.name}”</DialogTitle>
        <DialogContent>
          {items.length === 0 ? (
            <Alert severity="info">
              Primero agrega cartas a tu <Link to="/my-collection">colección principal</Link>.
            </Alert>
          ) : (
            <List dense sx={{ maxHeight: 360, overflow: 'auto' }}>
              {items.map((i) => {
                const yaEsta = (agregandoA?.cardIds || []).includes(i.cardId);
                return (
                  <ListItem key={i.id} button="true" disabled={yaEsta}
                    onClick={() => setElegida(i.cardId)}
                    selected={elegida === i.cardId}>
                    <Radio checked={elegida === i.cardId} disabled={yaEsta} size="small" />
                    <ListItemText
                      primary={`${i.nombre}${yaEsta ? ' (ya está en la colección)' : ''}`}
                      secondary={`${i.juego || ''} ${i.estado ? '· ' + i.estado : ''}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAgregandoA(null)}>Cancelar</Button>
          <Button variant="contained" onClick={agregarCarta} disabled={!elegida}>Agregar</Button>
        </DialogActions>
      </Dialog>

      {/* Eliminar colección */}
      <Dialog open={!!eliminando} onClose={() => setEliminando(null)} maxWidth="xs">
        <DialogTitle>¿Eliminar “{eliminando?.name}”?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Se elimina solo la colección temática; las cartas permanecen en tu colección principal.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEliminando(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={eliminar}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
