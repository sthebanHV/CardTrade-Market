import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup,
  FormControlLabel, Radio, TextField, Typography, Alert, Stack,
} from '@mui/material';
import { Flag as FlagIcon } from '@mui/icons-material';
import { reportsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const MOTIVOS = [
  { value: 'FRAUDE', label: 'Posible fraude' },
  { value: 'FALSO', label: 'Carta falsa o adulterada' },
  { value: 'PRECIO_ABUSIVO', label: 'Precio abusivo' },
  { value: 'DESCRIPCION_ENGANOSA', label: 'Descripción engañosa' },
  { value: 'OTRO', label: 'Otro motivo' },
];

export const ReportModal = ({ open, onClose, cardId, cardNombre }) => {
  const showToast = useStore((s) => s.showToast);
  const [motivo, setMotivo] = useState('FRAUDE');
  const [detalles, setDetalles] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async () => {
    setEnviando(true);
    setError('');
    try {
      await reportsAPI.create({ cardId, motivo, detalles: detalles.trim() || undefined });
      showToast({
        message: 'Reporte enviado. El equipo de CardTrade lo revisará pronto.',
        severity: 'success',
      });
      setDetalles('');
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || 'No se pudo enviar el reporte');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FlagIcon color="error" /> Reportar publicación
      </DialogTitle>
      <DialogContent dividers>
        {cardNombre && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Estás reportando: <strong>{cardNombre}</strong>
          </Typography>
        )}
        <RadioGroup value={motivo} onChange={(e) => setMotivo(e.target.value)}>
          {MOTIVOS.map((m) => (
            <FormControlLabel key={m.value} value={m.value} control={<Radio size="small" />} label={m.label} />
          ))}
        </RadioGroup>
        <TextField
          label="Detalles (opcional)"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          multiline
          minRows={3}
          inputProps={{ maxLength: 1000 }}
          helperText="Cuéntanos qué sucede. El vendedor no verá tu identidad."
          sx={{ mt: 2 }}
          fullWidth
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>{error}</Alert>
        )}
        <Stack spacing={0.5} sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Los reportes son anónimos para el vendedor y solo los revisa el equipo de moderación.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={enviando}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={enviar} loading={enviando}>
          Enviar reporte
        </Button>
      </DialogActions>
    </Dialog>
  );
};
