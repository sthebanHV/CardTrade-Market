import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, Grid,
  CircularProgress, Alert, TextField, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, Card, CardMedia,
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  ListAlt as WishIcon,
} from '@mui/icons-material';
import { wishlistAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const CATEGORIAS = [
  { v: 'BUSCO', label: 'Busco' },
  { v: 'INTERCAMBIO', label: 'Intercambio' },
  { v: 'COMPRAR', label: 'Comprar' },
];
const PRIORIDADES = [
  { v: 'ALTA', label: 'Alta' },
  { v: 'MEDIA', label: 'Media' },
  { v: 'BAJA', label: 'Baja' },
];
const colorPrioridad = { ALTA: 'error', MEDIA: 'warning', BAJA: 'default' };

export const WishlistPage = () => {
  const showToast = useStore((s) => s.showToast);
  const token = useStore((s) => s.token);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState(null); // {modo:'crear'|'editar', item}
  const [form, setForm] = useState({ cardId: '', categoria: 'COMPRAR', prioridad: 'MEDIA', nota: '' });
  const [cardIdManual, setCardIdManual] = useState('');

  useEffect(() => {
    if (!token) {
      setCargando(false);
      return;
    }
    wishlistAPI.list()
      .then((data) => setItems(data || []))
      .catch(() => setError('No se pudo cargar tu lista de deseos.'))
      .finally(() => setCargando(false));
  }, [token]);

  const abrirCrear = () => {
    setForm({ cardId: '', categoria: 'COMPRAR', prioridad: 'MEDIA', nota: '' });
    setCardIdManual('');
    setDialog({ modo: 'crear' });
  };

  const abrirEditar = (item) => {
    setForm({
      cardId: item.cardId,
      categoria: item.categoria || 'COMPRAR',
      prioridad: item.prioridad || 'MEDIA',
      nota: item.nota || '',
    });
    setCardIdManual(item.cardId);
    setDialog({ modo: 'editar', item });
  };

  const guardar = async () => {
    try {
      if (dialog.modo === 'crear') {
        const cardId = (form.cardId || cardIdManual || '').trim();
        if (!cardId) {
          showToast({ message: 'Pega el ID de la carta (desde el detalle de la carta)', severity: 'warning' });
          return;
        }
        const creado = await wishlistAPI.create({
          cardId,
          categoria: form.categoria,
          prioridad: form.prioridad,
          nota: form.nota,
        });
        setItems((prev) => [creado, ...prev]);
      } else {
        const actualizado = await wishlistAPI.update(dialog.item.id, {
          categoria: form.categoria,
          prioridad: form.prioridad,
          nota: form.nota,
        });
        setItems((prev) => prev.map((x) => (x.id === dialog.item.id ? actualizado : x)));
      }
      setDialog(null);
      showToast({ message: 'Lista de deseos actualizada', severity: 'success' });
    } catch (e) {
      const d = e.response?.data;
      showToast({ message: (typeof d === 'string' && d) || d?.error || 'No se pudo guardar', severity: 'error' });
    }
  };

  const eliminar = async (item) => {
    try {
      await wishlistAPI.remove(item.id);
      setItems((prev) => prev.filter((x) => x.id !== item.id));
      showToast({ message: 'Deseo eliminado', severity: 'success' });
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    }
  };

  if (cargando) return <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Lista de deseos</Typography>
          <Typography variant="body2" color="text.secondary">
            Cartas que buscas, quieres intercambiar o planeas comprar · US-42
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={abrirCrear}>Agregar deseo</Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {items.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <WishIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>Tu lista está vacía</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Agrega cartas que estés buscando para que otros usuarios puedan ofrecértelas.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={abrirCrear}>Agregar el primero</Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                <Stack direction="row" spacing={1.5} sx={{ p: 2 }}>
                  {item.card?.imagenes?.[0] ? (
                    <CardMedia component="img" image={item.card.imagenes[0]} alt=""
                      sx={{ width: 72, height: 96, borderRadius: 1.5, objectFit: 'cover' }} />
                  ) : (
                    <Box sx={{ width: 72, height: 96, borderRadius: 1.5, bgcolor: 'grey.200' }} />
                  )}
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography component={Link} to={`/cards/${item.cardId}`}
                      sx={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>
                      {item.card?.nombre || 'Carta'}
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip
                        label={(CATEGORIAS.find((c) => c.v === item.categoria) || {}).label || item.categoria}
                        size="small" color="primary" variant="outlined"
                      />
                      <Chip
                        label={(PRIORIDADES.find((p) => p.v === item.prioridad) || {}).label || item.prioridad}
                        size="small" color={colorPrioridad[item.prioridad] || 'default'}
                      />
                    </Stack>
                    {item.nota && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
                        “{item.nota}”
                      </Typography>
                    )}
                  </Box>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" sx={{ px: 1.5, pb: 1 }}>
                  <IconButton size="small" onClick={() => abrirEditar(item)} aria-label="Editar"><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => eliminar(item)} aria-label="Eliminar"><DeleteIcon fontSize="small" /></IconButton>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={!!dialog} onClose={() => setDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog?.modo === 'crear' ? 'Agregar deseo' : 'Editar deseo'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {dialog?.modo === 'crear' && (
              <TextField label="ID de la carta" fullWidth value={cardIdManual}
                helperText="Copia el ID desde la URL o detalle de la carta"
                onChange={(e) => setCardIdManual(e.target.value)} />
            )}
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select label="Categoría" value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                {CATEGORIAS.map((c) => <MenuItem key={c.v} value={c.v}>{c.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Prioridad</InputLabel>
              <Select label="Prioridad" value={form.prioridad}
                onChange={(e) => setForm({ ...form, prioridad: e.target.value })}>
                {PRIORIDADES.map((p) => <MenuItem key={p.v} value={p.v}>{p.label}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Nota (opcional)" fullWidth multiline minRows={2} value={form.nota}
              onChange={(e) => setForm({ ...form, nota: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
