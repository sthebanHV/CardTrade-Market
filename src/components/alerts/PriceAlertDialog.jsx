import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, Alert, Typography,
} from '@mui/material';
import { priceAlertsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

export const PriceAlertDialog = ({ open, onClose, card }) => {
  const showToast = useStore((s) => s.showToast);
  const [target, setTarget] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const guardar = async () => {
    const t = parseFloat(target);
    if (!t || t <= 0) {
      setError('Ingresa un precio objetivo válido');
      return;
    }
    setError('');
    setCargando(true);
    try {
      await priceAlertsAPI.create(card.id, t);
      showToast({
        message: `Te avisaremos cuando “${card.nombre}” baje a $${t.toFixed(2)}`,
        severity: 'success',
      });
      setTarget('');
      onClose();
    } catch (e) {
      const d = e.response?.data;
      setError(typeof d === 'string' && d ? d : d?.error || 'No se pudo crear la alerta');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Alerta de precio</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="body2" color="text.secondary">
            Recibirás una notificación cuando <strong>{card?.nombre}</strong> baje a tu precio objetivo.
            Precio actual: <strong>${Number(card?.precio ?? 0).toFixed(2)}</strong>
          </Typography>
          <TextField
            label="Precio objetivo" type="number" fullWidth autoFocus
            inputProps={{ min: 1, step: '0.01' }}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={guardar} disabled={cargando}>
          {cargando ? 'Guardando…' : 'Crear alerta'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
