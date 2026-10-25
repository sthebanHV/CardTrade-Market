import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, Alert, MenuItem, IconButton, Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { collectionAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const ESTADOS = ['NM', 'LP', 'MP', 'DMG'];

export const AddToCollectionDialog = ({ open, onClose, card, onAdded }) => {
  const showToast = useStore((s) => s.showToast);
  const [form, setForm] = useState({
    juego: '', rareza: '', estado: 'NM', fechaAdquisicion: '', precioPagado: '', notas: '',
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const guardar = async () => {
    setError('');
    setCargando(true);
    try {
      await collectionAPI.addItem({
        cardId: card.id,
        juego: form.juego || card.tipo || '',
        rareza: form.rareza || '',
        estado: form.estado || '',
        fechaAdquisicion: form.fechaAdquisicion || '',
        precioPagado: form.precioPagado || '',
        notas: form.notas || '',
      });
      showToast({ message: 'Agregada a tu colección', severity: 'success' });
      onClose();
      if (onAdded) onAdded();
    } catch (e) {
      const d = e.response?.data;
      setError(typeof d === 'string' && d ? d : d?.error || 'No se pudo agregar la carta');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Agregar a mi colección
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Nombre de la carta" fullWidth disabled value={card?.nombre || ''} />
          <Stack direction="row" spacing={2}>
            <TextField label="Juego" fullWidth value={form.juego}
              placeholder={card?.tipo || ''}
              onChange={(e) => setForm({ ...form, juego: e.target.value })} />
            <TextField label="Rareza" fullWidth value={form.rareza}
              onChange={(e) => setForm({ ...form, rareza: e.target.value })} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="Estado" select fullWidth value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              {ESTADOS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField label="Fecha de adquisición" type="date" fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.fechaAdquisicion}
              onChange={(e) => setForm({ ...form, fechaAdquisicion: e.target.value })} />
            <TextField label="Precio pagado" type="number" fullWidth value={form.precioPagado}
              onChange={(e) => setForm({ ...form, precioPagado: e.target.value })} />
          </Stack>
          <TextField label="Notas personales (opcional)" fullWidth multiline minRows={2}
            value={form.notas}
            onChange={(e) => setForm({ ...form, notas: e.target.value })} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={guardar} disabled={cargando}>
          {cargando ? 'Guardando…' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
