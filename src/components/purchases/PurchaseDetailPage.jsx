import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, Divider, List, ListItem,
  ListItemText, CircularProgress, Alert, Stepper, Step, StepLabel,
  Rating, TextField, IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { ordersAPI, reviewsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const fmtFecha = (d) => new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

const PASOS_TRACKING = ['PREPARACION', 'EN_TRANSITO', 'EN_REPARTO', 'ENTREGADO'];
const LABELS = {
  PREPARACION: 'Preparación',
  EN_TRANSITO: 'En tránsito',
  EN_REPARTO: 'En reparto',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
};

export const PurchaseDetailPage = () => {
  const { orderId } = useParams();
  const user = useStore((s) => s.user);
  const showToast = useStore((s) => s.showToast);
  const [orden, setOrden] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [ratingForm, setRatingForm] = useState(5);
  const [commentForm, setCommentForm] = useState('');
  const [editando, setEditando] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const cargarReviews = () =>
    reviewsAPI.byOrder(orderId).then(setReviews).catch(() => setReviews([]));

  useEffect(() => {
    let activo = true;
    Promise.all([
      ordersAPI.getById(orderId),
      ordersAPI.tracking(orderId).catch(() => null),
    ])
      .then(([o, t]) => { if (activo) { setOrden(o); setTracking(t); } })
      .catch(() => { if (activo) setError('No se pudo cargar la orden.'); })
      .finally(() => { if (activo) setCargando(false); });
    cargarReviews();
    return () => { activo = false; };
  }, [orderId]);

  const enviarReview = async () => {
    if (enviando) return;
    setEnviando(true);
    try {
      const item = orden.items?.[0];
      await reviewsAPI.create({
        orderId,
        cardId: item?.cardId || orden.cardIds?.[0],
        rating: Math.round(ratingForm),
        comment: commentForm,
      });
      showToast({ message: '¡Gracias por tu reseña!', severity: 'success' });
      setCommentForm('');
      setEditando(false);
      cargarReviews();
    } catch (e) {
      const d = e.response?.data;
      showToast({ message: (typeof d === 'string' && d) || d?.error || 'No se pudo enviar la reseña', severity: 'error' });
    } finally {
      setEnviando(false);
    }
  };

  const editarReview = async () => {
    const mia = reviews.find((r) => r.userId === user?.id);
    if (!mia || enviando) return;
    setEnviando(true);
    try {
      await reviewsAPI.update(mia.id, { rating: Math.round(ratingForm), comment: commentForm });
      showToast({ message: 'Reseña actualizada', severity: 'success' });
      setEditando(false);
      cargarReviews();
    } catch {
      showToast({ message: 'No se pudo actualizar', severity: 'error' });
    } finally {
      setEnviando(false);
    }
  };

  const eliminarReview = async () => {
    const mia = reviews.find((r) => r.userId === user?.id);
    if (!mia) return;
    try {
      await reviewsAPI.remove(mia.id);
      showToast({ message: 'Reseña eliminada', severity: 'success' });
      cargarReviews();
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    }
  };

  if (cargando) {
    return <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>;
  }
  if (error || !orden) {
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', py: 4 }}>
        <Alert severity="error">{error || 'Orden no encontrada'}</Alert>
        <Button component={Link} to="/my-purchases" sx={{ mt: 2 }}>← Mis compras</Button>
      </Box>
    );
  }

  const t = tracking || {};
  const pasoActual = PASOS_TRACKING.indexOf(t.trackingStatus);
  const eventos = t.events || [];

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{orden.numeroOrden}</Typography>
          <Typography variant="body2" color="text.secondary">
            Compra del {fmtFecha(orden.createdAt)}
          </Typography>
        </Box>
        <Button variant="outlined" component={Link} to="/my-purchases">← Mis compras</Button>
      </Stack>

      {/* Envío / tracking (US-38) */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Rastreo de envío</Typography>
          <Chip
            label={(t.trackingStatus || 'PREPARACION').replace('_', ' ').toLowerCase()}
            color={t.trackingStatus === 'ENTREGADO' ? 'success' : 'primary'}
            size="small"
          />
        </Stack>

        {t.carrier && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Transportista: <strong>{t.carrier}</strong>
            {t.trackingNumber ? ` · Guía ${t.trackingNumber}` : ''}
            {t.eta ? ` · Llegada estimada ${fmtFecha(t.eta)}` : ''}
          </Typography>
        )}

        {t.trackingStatus === 'CANCELADO' ? (
          <Alert severity="error">Esta orden fue cancelada.</Alert>
        ) : (
          <Stepper activeStep={Math.max(0, pasoActual)} sx={{ mb: 2 }}>
            {PASOS_TRACKING.map((p) => (
              <Step key={p}><StepLabel>{LABELS[p]}</StepLabel></Step>
            ))}
          </Stepper>
        )}

        <Divider sx={{ mb: 1.5 }} />
        <Typography variant="overline" color="text.secondary">Eventos</Typography>
        <List dense>
          {[...eventos].reverse().map((ev, idx) => (
            <ListItem key={idx} disableGutters>
              <ListItemText
                primary={ev.descripcion}
                secondary={`${ev.fecha ? new Date(ev.fecha).toLocaleString('es-MX') : ''} · ${LABELS[ev.status] || ev.status || ''}`}
              />
            </ListItem>
          ))}
          {eventos.length === 0 && (
            <ListItem disableGutters>
              <ListItemText primary="Sin eventos de rastreo aún" secondary="En cuanto el paquete salga verás las actualizaciones aquí." />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Artículos */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Artículos</Typography>
        <List dense disablePadding>
          {(orden.items || []).map((it, idx) => (
            <ListItem key={idx} disableGutters>
              <ListItemText
                primary={
                  <Button component={Link} to={`/cards/${it.cardId}`} size="small" sx={{ textTransform: 'none', px: 0 }}>
                    {it.nombre}
                  </Button>
                }
                secondary={`Precio unitario: ${fmt(it.precioUnitario)}`}
              />
            </ListItem>
          ))}
          {!orden.items?.length && (orden.cardIds || []).map((cid) => (
            <ListItem key={cid} disableGutters>
              <ListItemText primary={<Button component={Link} to={`/cards/${cid}`} size="small">Ver carta</Button>} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1.5 }} />
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Subtotal</Typography><Typography>{fmt(orden.subtotal)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Envío ({orden.shippingMethod === 'EXPRESS' ? 'express' : 'estándar'})</Typography>
            <Typography>{fmt(orden.shippingCost)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 800 }}>TOTAL</Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>{fmt(orden.total)}</Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* Dirección */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Dirección de envío</Typography>
        {orden.shippingAddress ? (
          <Typography variant="body2" color="text.secondary">
            {orden.shippingAddress.nombre || orden.shippingAddress.nombreCompleto || ''} —{' '}
            {orden.shippingAddress.linea1}
            {orden.shippingAddress.linea2 ? `, ${orden.shippingAddress.linea2}` : ''},{' '}
            {orden.shippingAddress.ciudad}, {orden.shippingAddress.estado} · C.P. {orden.shippingAddress.codigoPostal}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">Sin dirección registrada</Typography>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Pago con {orden.paymentMethod}{orden.guestEmail ? ` · Contacto ${orden.guestEmail}` : ''}
        </Typography>
      </Paper>

      {/* US-39: Reseñas de la compra */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>Reseñas de esta compra</Typography>

        {orden.status !== 'DELIVERED' && (
          <Alert severity="info" sx={{ mb: 1.5 }}>
            Podrás dejar una reseña cuando la compra esté entregada.
          </Alert>
        )}

        {reviews.length === 0 && orden.status === 'DELIVERED' && !editando && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Aún no hay reseñas. ¡Sé el primero en calificar!
          </Typography>
        )}

        {reviews.map((r) => {
          const mia = r.userId === user?.id;
          return (
            <Box key={r.id} sx={{ py: 1.5, borderBottom: reviews.length > 1 ? 1 : 0, borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={r.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(r.createdAt).toLocaleDateString('es-MX')}
                  </Typography>
                </Stack>
                {mia && (
                  <Stack direction="row">
                    <IconButton size="small" onClick={() => { setRatingForm(r.rating); setCommentForm(r.comment || ''); setEditando(true); }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={eliminarReview}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
              {r.comment && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>{r.comment}</Typography>
              )}
            </Box>
          );
        })}

        {orden.status === 'DELIVERED' && !editando && !reviews.some((r) => r.userId === user?.id) && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Tu reseña</Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
              <Rating value={ratingForm} onChange={(_, v) => setRatingForm(v || 1)} size="large" />
              <Typography variant="body2" color="text.secondary">{ratingForm} de 5</Typography>
            </Stack>
            <TextField fullWidth multiline minRows={2} size="small" label="Comentario (opcional)"
              value={commentForm} onChange={(e) => setCommentForm(e.target.value)} sx={{ mb: 1.5 }} />
            <Button variant="contained" onClick={enviarReview} disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar reseña'}
            </Button>
          </Box>
        )}

        {editando && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Editar reseña</Typography>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
              <Rating value={ratingForm} onChange={(_, v) => setRatingForm(v || 1)} size="large" />
              <Typography variant="body2" color="text.secondary">{ratingForm} de 5</Typography>
            </Stack>
            <TextField fullWidth multiline minRows={2} size="small" label="Comentario"
              value={commentForm} onChange={(e) => setCommentForm(e.target.value)} sx={{ mb: 1.5 }} />
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={editarReview} disabled={enviando}>
                {enviando ? 'Guardando…' : 'Guardar'}
              </Button>
              <Button variant="outlined" onClick={() => setEditando(false)}>Cancelar</Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
