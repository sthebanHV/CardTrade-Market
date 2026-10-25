import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Divider, Chip, Alert,
  Skeleton, List, ListItem, ListItemText,
} from '@mui/material';
import { CheckCircle as OkIcon, LocalShipping, ReceiptLong } from '@mui/icons-material';
import { useStore } from '../../store';
import { ordersAPI } from '../../api/apiClient';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const fmtFecha = (d) =>
  new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

const ETA = { ESTANDAR: 7, EXPRESS: 2 };

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const token = useStore((s) => s.token);
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    const guardada = (() => {
      try { return JSON.parse(sessionStorage.getItem('ctmUltimaOrden') || 'null'); }
      catch { return null; }
    })();
    if (guardada && String(guardada.id) === String(orderId)) {
      setOrden(guardada);
      setCargando(false);
      return;
    }
    if (!token) {
      setOrden(null);
      setError('Inicia sesión para ver los detalles de tu pedido.');
      setCargando(false);
      return;
    }
    ordersAPI.getById(orderId)
      .then((o) => { if (activo) setOrden(o); })
      .catch(() => { if (activo) setError('No se pudo cargar la orden.'); })
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, [orderId, token]);

  if (cargando) {
    return (
      <Box sx={{ maxWidth: 760, mx: 'auto', py: 4 }}>
        <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={260} sx={{ mt: 2, borderRadius: 3 }} />
      </Box>
    );
  }

  if (error && !orden) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
        <Alert severity="warning">{error}</Alert>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {token && <Button variant="contained" onClick={() => navigate('/profile')}>Ir a mi perfil</Button>}
          <Button variant="outlined" onClick={() => navigate('/cards')}>Seguir comprando</Button>
        </Stack>
      </Box>
    );
  }

  const eta = new Date();
  eta.setDate(eta.getDate() + (ETA[orden.shippingMethod] || 7));

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', py: 2 }}>
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <OkIcon color="success" sx={{ fontSize: 64 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>¡Gracias por tu compra!</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Tu pago fue procesado correctamente. Hemos enviado el comprobante
          {orden.guestEmail ? ` a ${orden.guestEmail}` : ' a tu correo'}.
        </Typography>
        <Chip
          label={`Orden ${orden.numeroOrden}`}
          color="primary"
          sx={{ mt: 2, fontSize: '1rem', fontWeight: 700, px: 1 }}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalShipping color="primary" fontSize="small" />
              <Typography variant="overline" color="text.secondary">Entrega estimada</Typography>
            </Stack>
            <Typography sx={{ fontWeight: 700 }}>{fmtFecha(eta)}</Typography>
            <Typography variant="caption" color="text.secondary">
              Envío {orden.shippingMethod === 'EXPRESS' ? 'express' : 'estándar'} ·{' '}
              {fmt(orden.shippingCost)}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <ReceiptLong color="primary" fontSize="small" />
              <Typography variant="overline" color="text.secondary">Fecha del pedido</Typography>
            </Stack>
            <Typography sx={{ fontWeight: 700 }}>{fmtFecha(orden.fecha || Date.now())}</Typography>
            <Typography variant="caption" color="text.secondary">
              Estado: {orden.status === 'PAID' ? 'Pagada' : orden.status}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="overline" color="text.secondary">Artículos</Typography>
        <List dense disablePadding>
          {(orden.items || orden.detalles || []).map((it, idx) => {
            const nombre = it.cardName || it.nombre || it.card?.nombre || 'Carta';
            const precio = it.price ?? it.precio ?? it.subtotal ?? 0;
            return (
              <ListItem key={it.id || it.cardId || idx} disableGutters>
                <ListItemText
                  primary={nombre}
                  secondary={it.cantidad ? `Cantidad: ${it.cantidad}` : 'Cantidad: 1'}
                />
                <Typography sx={{ fontWeight: 600 }}>{fmt(precio)}</Typography>
              </ListItem>
            );
          })}
          {!orden.items && !orden.detalles && orden.cardIds && (
            <ListItem disableGutters>
              <ListItemText
                primary={`${orden.cardIds.length} carta${orden.cardIds.length > 1 ? 's' : ''}`}
                secondary="Detalle disponible en tu historial de órdenes"
              />
            </ListItem>
          )}
        </List>

        <Divider sx={{ my: 1.5 }} />
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>{fmt(orden.subtotal)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Envío</Typography>
            <Typography>{fmt(orden.shippingCost)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 800 }}>TOTAL</Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>{fmt(orden.total)}</Typography>
          </Stack>
        </Stack>

        <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" component={Link} to="/cards">Seguir comprando</Button>
          <Button variant="outlined" component={Link} to="/profile">Mi perfil</Button>
        </Box>
      </Paper>
    </Box>
  );
};
