import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, TextField,
  MenuItem, Grid, Alert, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Download as DownloadIcon, Search as SearchIcon, BarChart as StatsIcon,
} from '@mui/icons-material';
import { collectionAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const ESTADOS = ['', 'NM', 'LP', 'MP', 'DMG'];
const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const VACIO = { estado: '', rareza: '', fechaAdquisicion: '', precioPagado: '', notas: '' };

export const CollectionPage = () => {
  const showToast = useStore((s) => s.showToast);
  const token = useStore((s) => s.token);
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ juego: '', rareza: '', estado: '', q: '' });
  const [dialog, setDialog] = useState(null); // {modo, item}
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState('');
  const [eliminando, setEliminando] = useState(null);
  const [exportando, setExportando] = useState(false);

  const cargar = () => {
    setCargando(true);
    Promise.all([collectionAPI.items(), collectionAPI.stats()])
      .then(([i, s]) => { setItems(i); setStats(s); })
      .catch(() => showToast({ message: 'No se pudo cargar tu colección', severity: 'error' }))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  const filtrados = useMemo(() => items.filter((i) => {
    if (filtros.juego && i.juego !== filtros.juego) return false;
    if (filtros.rareza && i.rareza !== filtros.rareza) return false;
    if (filtros.estado && i.estado !== filtros.estado) return false;
    if (filtros.q && !(i.nombre || '').toLowerCase().includes(filtros.q.toLowerCase())) return false;
    return true;
  }), [items, filtros]);

  const juegos = useMemo(() => [...new Set(items.map((i) => i.juego).filter(Boolean))], [items]);
  const rarezas = useMemo(() => [...new Set(items.map((i) => i.rareza).filter(Boolean))], [items]);

  const abrirCrear = () => { setForm(VACIO); setError(''); setDialog({ modo: 'crear' }); };
  const abrirEditar = (item) => {
    setForm({
      estado: item.estado || '', rareza: item.rareza || '',
      fechaAdquisicion: item.fechaAdquisicion || '',
      precioPagado: item.precioPagado != null ? String(item.precioPagado) : '',
      notas: item.notas || '',
    });
    setError('');
    setDialog({ modo: 'editar', item });
  };

  const guardar = async () => {
    setError('');
    try {
      if (dialog.modo === 'editar') {
        await collectionAPI.updateItem(dialog.item.id, form);
        showToast({ message: 'Ítem actualizado', severity: 'success' });
      }
      setDialog(null);
      cargar();
    } catch (e) {
      const d = e.response?.data;
      setError(typeof d === 'string' && d ? d : d?.error || 'No se pudo guardar');
    }
  };

  const eliminar = async () => {
    try {
      await collectionAPI.removeItem(eliminando.id);
      showToast({ message: 'Carta eliminada de tu colección', severity: 'success' });
      cargar();
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    } finally {
      setEliminando(null);
    }
  };

  const exportar = async () => {
    setExportando(true);
    try {
      const res = await fetch(collectionAPI.exportUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('' + res.status);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mi-coleccion.csv';
      a.click();
      URL.revokeObjectURL(url);
      showToast({ message: 'Colección exportada (CSV)', severity: 'success' });
    } catch {
      showToast({ message: 'No se pudo exportar la colección', severity: 'error' });
    } finally {
      setExportando(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Mi colección</Typography>
          <Typography variant="body2" color="text.secondary">
            {items.length} carta{items.length !== 1 ? 's' : ''} registrada{items.length !== 1 ? 's' : ''} (US-30)
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<StatsIcon />} component={Link} to="/my-collection/stats">
            Estadísticas
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportar} disabled={exportando || items.length === 0}>
            {exportando ? 'Exportando…' : 'Exportar CSV'}
          </Button>
        </Stack>
      </Stack>

      {stats && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Cartas', value: stats.totalCartas },
            { label: 'Valor estimado', value: fmt(stats.totalValor) },
            { label: 'Valor promedio', value: fmt(stats.valorPromedio) },
            { label: 'Última agregada', value: stats.ultimaAgregada ? new Date(stats.ultimaAgregada).toLocaleDateString('es-MX') : '—' },
          ].map((s) => (
            <Grid item xs={6} md={3} key={s.label}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="overline" color="text.secondary">{s.label}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{s.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            size="small" placeholder="Buscar en mi colección…" fullWidth
            value={filtros.q} onChange={(e) => setFiltros({ ...filtros, q: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          />
          <TextField size="small" select label="Juego" value={filtros.juego} sx={{ minWidth: 150 }}
            onChange={(e) => setFiltros({ ...filtros, juego: e.target.value })}>
            <MenuItem value="">Todos</MenuItem>
            {juegos.map((j) => <MenuItem key={j} value={j}>{j}</MenuItem>)}
          </TextField>
          <TextField size="small" select label="Rareza" value={filtros.rareza} sx={{ minWidth: 140 }}
            onChange={(e) => setFiltros({ ...filtros, rareza: e.target.value })}>
            <MenuItem value="">Todas</MenuItem>
            {rarezas.map((j) => <MenuItem key={j} value={j}>{j}</MenuItem>)}
          </TextField>
          <TextField size="small" select label="Estado" value={filtros.estado} sx={{ minWidth: 130 }}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}>
            <MenuItem value="">Todos</MenuItem>
            {ESTADOS.filter(Boolean).map((j) => <MenuItem key={j} value={j}>{j}</MenuItem>)}
          </TextField>
        </Stack>
      </Paper>

      {cargando ? (
        <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
      ) : items.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Tu colección está vacía</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Abre una carta y usa “Agregar a mi colección” para registrarla.
          </Typography>
          <Button variant="contained" component={Link} to="/cards">Explorar cartas</Button>
        </Paper>
      ) : filtrados.length === 0 ? (
        <Alert severity="info">Ningún ítem coincide con los filtros.</Alert>
      ) : (
        <Grid container spacing={2}>
          {filtrados.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  component={Link} to={`/cards/${item.cardId}`}
                  sx={{ display: 'block', textDecoration: 'none' }}
                >
                  <Box
                    component="img"
                    src={item.imagenDataUrl || 'https://placehold.co/200x260?text=Carta'}
                    alt={item.nombre}
                    sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 2, bgcolor: 'grey.100' }}
                  />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, mt: 1 }} noWrap>{item.nombre}</Typography>
                <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                  {item.estado && <Chip size="small" label={item.estado} />}
                  {item.rareza && <Chip size="small" variant="outlined" label={item.rareza} />}
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {item.fechaAdquisicion ? `Adquirida ${item.fechaAdquisicion}` : ''}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto', pt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {item.precioPagado != null ? fmt(item.precioPagado) : '—'}
                  </Typography>
                  <Stack direction="row">
                    <IconButton size="small" onClick={() => abrirEditar(item)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => setEliminando(item)}><DeleteIcon fontSize="small" /></IconButton>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Editar ítem */}
      <Dialog open={!!dialog} onClose={() => setDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog?.modo === 'editar' ? `Editar “${dialog?.item?.nombre}”` : 'Editar ítem'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <Stack direction="row" spacing={2}>
              <TextField label="Estado (NM, LP, MP…)" fullWidth select value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                <MenuItem value="">—</MenuItem>
                {ESTADOS.filter(Boolean).map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </TextField>
              <TextField label="Rareza" fullWidth value={form.rareza}
                onChange={(e) => setForm({ ...form, rareza: e.target.value })} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField label="Fecha de adquisición" type="date" fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.fechaAdquisicion}
                onChange={(e) => setForm({ ...form, fechaAdquisicion: e.target.value })} />
              <TextField label="Precio pagado" fullWidth type="number" value={form.precioPagado}
                onChange={(e) => setForm({ ...form, precioPagado: e.target.value })} />
            </Stack>
            <TextField label="Notas personales" fullWidth multiline minRows={2} value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Eliminar */}
      <Dialog open={!!eliminando} onClose={() => setEliminando(null)} maxWidth="xs">
        <DialogTitle>¿Quitar de tu colección?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Se eliminará “{eliminando?.nombre}” de tu colección (la publicación no se afecta).
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEliminando(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={eliminar}>Quitar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
