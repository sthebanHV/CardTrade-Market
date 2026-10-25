import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch,
  FormControlLabel, CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Home as HomeIcon, Star as StarIcon,
} from '@mui/icons-material';
import { addressesAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const VACIO = { nombreCompleto: '', linea1: '', linea2: '', ciudad: '', estado: '', codigoPostal: '', telefono: '' };

export const AddressesPage = () => {
  const showToast = useStore((s) => s.showToast);
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [dialog, setDialog] = useState(null); // {modo:'crear'|'editar', addr} | null
  const [form, setForm] = useState(VACIO);
  const [pred, setPred] = useState(false);
  const [error, setError] = useState('');
  const [eliminando, setEliminando] = useState(null);

  const cargar = () => {
    setCargando(true);
    addressesAPI.list()
      .then(setLista)
      .catch(() => showToast({ message: 'No se pudieron cargar tus direcciones', severity: 'error' }))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  const abrirCrear = () => { setForm(VACIO); setPred(lista.length === 0); setError(''); setDialog({ modo: 'crear' }); };
  const abrirEditar = (a) => { setForm({ ...VACIO, ...a }); setPred(!!a.predeterminada); setError(''); setDialog({ modo: 'editar', addr: a }); };

  const guardar = async () => {
    if (!form.nombreCompleto.trim() || !form.linea1.trim() || !form.ciudad.trim() ||
        !form.estado.trim() || !form.codigoPostal.trim()) {
      setError('Completa los campos obligatorios (nombre, calle, ciudad, estado y C.P.)');
      return;
    }
    const payload = { ...form, predeterminada: pred };
    setError('');
    try {
      if (dialog.modo === 'crear') await addressesAPI.create(payload);
      else await addressesAPI.update(dialog.addr.id, payload);
      setDialog(null);
      showToast({ message: 'Dirección guardada', severity: 'success' });
      cargar();
    } catch (e) {
      const d = e.response?.data;
      setError(typeof d === 'string' && d ? d : 'No se pudo guardar la dirección');
    }
  };

  const eliminar = async () => {
    try {
      await addressesAPI.remove(eliminando.id);
      showToast({ message: 'Dirección eliminada', severity: 'success' });
      cargar();
    } catch (e) {
      showToast({ message: 'No se pudo eliminar la dirección', severity: 'error' });
    } finally {
      setEliminando(null);
    }
  };

  const marcarPredeterminada = async (a) => {
    try {
      await addressesAPI.setDefault(a.id);
      cargar();
    } catch {
      showToast({ message: 'No se pudo actualizar la dirección predeterminada', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Direcciones de envío</Typography>
          <Typography variant="body2" color="text.secondary">
            Guarda hasta 5 direcciones para agilizar tus compras (US-26)
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={abrirCrear}
          disabled={lista.length >= 5}>
          Nueva dirección
        </Button>
      </Stack>

      {lista.length >= 5 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Has alcanzado el máximo de 5 direcciones. Elimina alguna para agregar otra.
        </Alert>
      )}

      {cargando ? (
        <Stack spacing={2}>{[1, 2].map((i) => <Paper key={i} variant="outlined" sx={{ p: 3, borderRadius: 3 }}><CircularProgress size={24} /></Paper>)}</Stack>
      ) : lista.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <HomeIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>Aún no tienes direcciones</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Registra tu primera dirección de envío.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={abrirCrear}>Agregar dirección</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {lista.map((a) => (
            <Paper key={a.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <HomeIcon color={a.predeterminada ? 'primary' : 'action'} />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 700 }}>{a.nombreCompleto}</Typography>
                    {a.predeterminada && <Chip label="Predeterminada" size="small" color="primary" />}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {a.linea1}{a.linea2 ? `, ${a.linea2}` : ''}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.ciudad}, {a.estado} · C.P. {a.codigoPostal}
                    {a.telefono ? ` · Tel. ${a.telefono}` : ''}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5}>
                  {!a.predeterminada && (
                    <IconButton size="small" title="Marcar como predeterminada" onClick={() => marcarPredeterminada(a)}>
                      <StarIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton size="small" onClick={() => abrirEditar(a)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => setEliminando(a)}><DeleteIcon fontSize="small" /></IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <Button component={Link} to="/settings" sx={{ mt: 3 }}>← Volver a configuración</Button>

      {/* Dialog crear/editar */}
      <Dialog open={!!dialog} onClose={() => setDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog?.modo === 'crear' ? 'Nueva dirección' : 'Editar dirección'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Nombre completo *" fullWidth value={form.nombreCompleto}
              onChange={(e) => setForm({ ...form, nombreCompleto: e.target.value })} />
            <TextField label="Calle y número *" fullWidth value={form.linea1}
              onChange={(e) => setForm({ ...form, linea1: e.target.value })} />
            <TextField label="Interior / referencias" fullWidth value={form.linea2 || ''}
              onChange={(e) => setForm({ ...form, linea2: e.target.value })} />
            <Stack direction="row" spacing={2}>
              <TextField label="Ciudad *" fullWidth value={form.ciudad}
                onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />
              <TextField label="Estado *" fullWidth value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField label="Código Postal *" fullWidth value={form.codigoPostal}
                onChange={(e) => setForm({ ...form, codigoPostal: e.target.value })} />
              <TextField label="Teléfono" fullWidth value={form.telefono || ''}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </Stack>
            <FormControlLabel
              control={<Switch checked={pred} onChange={(e) => setPred(e.target.checked)} />}
              label="Usar como dirección predeterminada"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog eliminar */}
      <Dialog open={!!eliminando} onClose={() => setEliminando(null)} maxWidth="xs">
        <DialogTitle>¿Eliminar esta dirección?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {eliminando?.nombreCompleto} — {eliminando?.linea1}, {eliminando?.ciudad}
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
