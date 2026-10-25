import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Switch, Chip, IconButton,
  CircularProgress, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField,
} from '@mui/material';
import {
  NotificationsActive as AlertIcon, Delete as DeleteIcon, Edit as EditIcon,
} from '@mui/icons-material';
import { priceAlertsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export const MyAlertsPage = () => {
  const showToast = useStore((s) => s.showToast);
  const [alertas, setAlertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(null);
  const [valor, setValor] = useState('');
  const [eliminando, setEliminando] = useState(null);

  const cargar = () => {
    setCargando(true);
    priceAlertsAPI.list()
      .then(setAlertas)
      .catch(() => setError('No se pudieron cargar tus alertas.'))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  const toggle = async (a) => {
    try {
      await priceAlertsAPI.update(a.id, { active: !a.active });
      cargar();
    } catch {
      showToast({ message: 'No se pudo actualizar la alerta', severity: 'error' });
    }
  };

  const guardar = async () => {
    const t = parseFloat(valor);
    if (!t || t <= 0) return;
    try {
      await priceAlertsAPI.update(editando.id, { targetPrice: t, active: true });
      setEditando(null);
      showToast({ message: 'Alerta actualizada', severity: 'success' });
      cargar();
    } catch (e) {
      showToast({ message: 'No se pudo actualizar', severity: 'error' });
    }
  };

  const eliminar = async () => {
    try {
      await priceAlertsAPI.remove(eliminando.id);
      showToast({ message: 'Alerta eliminada', severity: 'success' });
      cargar();
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    } finally {
      setEliminando(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Alertas de precio</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Te avisamos cuando una carta baja a tu precio objetivo (US-37)
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {cargando ? (
        <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
      ) : alertas.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <AlertIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>No tienes alertas de precio</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Abre una carta y pulsa “Alerta de precio” para crear una.
          </Typography>
          <Button variant="contained" component={Link} to="/cards">Explorar cartas</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {alertas.map((a) => {
            const alcanzado = a.precioActual != null && a.precioActual <= a.targetPrice;
            return (
              <Paper key={a.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                  {a.imagen ? (
                    <Box component="img" src={a.imagen} alt={a.cardNombre}
                      sx={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 1.5 }} />
                  ) : (
                    <AlertIcon color={a.active ? 'primary' : 'disabled'} />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        component={Link}
                        to={`/cards/${a.cardId}`}
                        style={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}
                      >
                        {a.cardNombre}
                      </Typography>
                      {a.active ? (
                        <Chip label="Activa" color="success" size="small" />
                      ) : (
                        <Chip label="Pausada" size="small" />
                      )}
                      {alcanzado && <Chip label="¡Alcanzado!" color="info" size="small" />}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Objetivo: <strong>{fmt(a.targetPrice)}</strong>
                      {a.precioActual != null ? ` · Actual: ${fmt(a.precioActual)}` : ' · Carta no disponible'}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Switch checked={!!a.active} onChange={() => toggle(a)} size="small" />
                    <IconButton size="small" onClick={() => { setValor(String(a.targetPrice)); setEditando(a); }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setEliminando(a)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}

      <Dialog open={!!editando} onClose={() => setEditando(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Editar precio objetivo</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {editando?.cardNombre} — actual {fmt(editando?.precioActual)}
          </Typography>
          <TextField label="Nuevo objetivo" type="number" fullWidth autoFocus
            inputProps={{ min: 1, step: '0.01' }}
            value={valor} onChange={(e) => setValor(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditando(null)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!eliminando} onClose={() => setEliminando(null)} maxWidth="xs">
        <DialogTitle>¿Eliminar esta alerta?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">{eliminando?.cardNombre}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEliminando(null)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={eliminar}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
