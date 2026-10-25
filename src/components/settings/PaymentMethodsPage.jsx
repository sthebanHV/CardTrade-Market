import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Radio, RadioGroup, FormControlLabel, CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon, Delete as DeleteIcon, CreditCard as CardIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { paymentMethodsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const detectBrand = (num) => {
  const n = num.replace(/\s/g, '');
  if (/^4/.test(n)) return 'VISA';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'MASTERCARD';
  if (/^3[47]/.test(n)) return 'AMEX';
  if (/^6/.test(n)) return 'DISCOVER';
  return 'TARJETA';
};

export const PaymentMethodsPage = () => {
  const showToast = useStore((s) => s.showToast);
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState({ numero: '', exp: '', titular: '' });
  const [pred, setPred] = useState(false);
  const [error, setError] = useState('');
  const [eliminando, setEliminando] = useState(null);

  const cargar = () => {
    setCargando(true);
    paymentMethodsAPI.list()
      .then(setLista)
      .catch(() => showToast({ message: 'No se pudieron cargar tus métodos de pago', severity: 'error' }))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  const guardar = async () => {
    const digits = form.numero.replace(/\s/g, '');
    if (digits.length < 13 || digits.length > 19) { setError('Número de tarjeta inválido'); return; }
    const m = form.exp.match(/^(\d{2})\/(\d{2})$/);
    if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) { setError('Vencimiento inválido (usa MM/AA)'); return; }
    if (!form.titular.trim()) { setError('Ingresa el nombre del titular'); return; }
    setError('');
    try {
      await paymentMethodsAPI.create({
        brand: detectBrand(digits),
        last4: digits.slice(-4),
        expiryMonth: m[1],
        expiryYear: `20${m[2]}`,
        holderName: form.titular.trim(),
        predeterminada: pred,
      });
      setDialog(false);
      setForm({ numero: '', exp: '', titular: '' });
      showToast({ message: 'Método de pago guardado', severity: 'success' });
      cargar();
    } catch (e) {
      const d = e.response?.data;
      setError(typeof d === 'string' && d ? d : 'No se pudo guardar el método de pago');
    }
  };

  const eliminar = async () => {
    try {
      await paymentMethodsAPI.remove(eliminando.id);
      showToast({ message: 'Método de pago eliminado', severity: 'success' });
      cargar();
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    } finally {
      setEliminando(null);
    }
  };

  const marcarPredeterminada = async (pm) => {
    try { await paymentMethodsAPI.setDefault(pm.id); cargar(); }
    catch { showToast({ message: 'No se pudo actualizar', severity: 'error' }); }
  };

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Métodos de pago</Typography>
          <Typography variant="body2" color="text.secondary">
            Solo se guarda la marca y los últimos 4 dígitos — nunca el CVV (US-27)
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} disabled={lista.length >= 5}
          onClick={() => { setError(''); setDialog(true); }}>
          Agregar tarjeta
        </Button>
      </Stack>

      {lista.length >= 5 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Has alcanzado el máximo de 5 métodos de pago.
        </Alert>
      )}

      {cargando ? (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}><CircularProgress size={24} /></Paper>
      ) : lista.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <CardIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>No tienes métodos de pago guardados</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Agrega una tarjeta para pagar más rápido.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialog(true)}>Agregar tarjeta</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {lista.map((pm) => (
            <Paper key={pm.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <CardIcon color={pm.predeterminada ? 'primary' : 'action'} />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 700 }}>{pm.brand}</Typography>
                    <Typography>•••• {pm.last4}</Typography>
                    {pm.predeterminada && <Chip label="Predeterminada" size="small" color="primary" />}
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Vence {String(pm.expiryMonth).padStart(2, '0')}/{String(pm.expiryYear).slice(-2)}
                    {pm.holderName ? ` · ${pm.holderName}` : ''}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5}>
                  {!pm.predeterminada && (
                    <IconButton size="small" title="Predeterminada" onClick={() => marcarPredeterminada(pm)}>
                      <StarIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton size="small" color="error" onClick={() => setEliminando(pm)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <Button component={Link} to="/settings" sx={{ mt: 3 }}>← Volver a configuración</Button>

      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar tarjeta</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Número de tarjeta" fullWidth autoFocus inputProps={{ maxLength: 19 }}
              placeholder="4242 4242 4242 4242"
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value.replace(/[^\d ]/g, '') })}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Vencimiento (MM/AA)" fullWidth inputProps={{ maxLength: 5 }}
                placeholder="12/29"
                value={form.exp}
                onChange={(e) => setForm({ ...form, exp: e.target.value.replace(/[^\d/]/g, '') })}
              />
              <TextField
                label="CVV" fullWidth type="password" inputProps={{ maxLength: 4 }}
                placeholder="•••"
                onChange={() => { /* solo visual, no se guarda */ }}
              />
            </Stack>
            <TextField
              label="Titular" fullWidth value={form.titular}
              onChange={(e) => setForm({ ...form, titular: e.target.value.toUpperCase() })}
            />
            <RadioGroup value={pred ? 'si' : 'no'} onChange={(e) => setPred(e.target.value === 'si')}>
              <FormControlLabel value="si" control={<Radio />} label="Usar como método predeterminado" />
              <FormControlLabel value="no" control={<Radio />} label="No predeterminar" />
            </RadioGroup>
            <Alert severity="info" variant="outlined">
              Pago simulado: solo se almacena la marca, los últimos 4 dígitos y la fecha de vencimiento.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!eliminando} onClose={() => setEliminando(null)} maxWidth="xs">
        <DialogTitle>¿Eliminar este método de pago?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {eliminando?.brand} •••• {eliminando?.last4}
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
