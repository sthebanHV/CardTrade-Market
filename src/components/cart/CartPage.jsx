import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Divider, Chip, Alert,
  CircularProgress, Skeleton,
} from '@mui/material';
import {
  Delete as DeleteIcon, ShoppingCartCheckout as CheckoutIcon,
  Storefront as BrowseIcon, CheckCircle as OkIcon, Cancel as BadIcon,
} from '@mui/icons-material';
import { useStore, carritoVigente } from '../../store';
import { cardsAPI } from '../../api/apiClient';

const ENVIO = 5.99;
const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export const CartPage = () => {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const navigate = useNavigate();

  const [disponibilidad, setDisponibilidad] = useState({}); // cardId -> {ok, motivo}
  const [verificando, setVerificando] = useState(true);

  const items = carritoVigente(cart);
  const subtotal = items.reduce((t, i) => t + parseFloat(i.price || 0), 0);

  useEffect(() => {
    let activo = true;
    if (items.length === 0) {
      setVerificando(false);
      return;
    }
    setVerificando(true);
    Promise.all(
      items.map((i) =>
        cardsAPI.getById(i.cardId).then((c) => {
          if (!c || !c.id) return { id: i.cardId, ok: false, motivo: 'Ya no existe' };
          if (c.status !== 'PUBLICADO') return { id: i.cardId, ok: false, motivo: 'Ya no está disponible' };
          if ((c.stock ?? 1) <= 0) return { id: i.cardId, ok: false, motivo: 'Sin stock' };
          return { id: i.cardId, ok: true, precio: c.precio };
        }).catch(() => ({ id: i.cardId, ok: false, motivo: 'No se pudo verificar' }))
      )
    ).then((res) => {
      if (!activo) return;
      const mapa = {};
      res.forEach((r) => { mapa[r.id] = r; });
      setDisponibilidad(mapa);
      setVerificando(false);
    });
    return () => { activo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length, items.map((i) => i.cardId).join(',')]);

  if (items.length === 0) {
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center', py: 6 }}>
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Carrito vacío</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Añade cartas a tu carrito para comenzar a comprar.
          </Typography>
          <Button variant="contained" startIcon={<BrowseIcon />} component={Link} to="/cards" sx={{ mt: 3 }}>
            Ver catálogo de cartas
          </Button>
        </Paper>
      </Box>
    );
  }

  const noDisponibles = items.filter((i) => disponibilidad[i.cardId] && !disponibilidad[i.cardId].ok);
  const todosOk = !verificando && noDisponibles.length === 0;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Carrito de compras</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
        {/* Items */}
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <Stack spacing={1.5}>
            {items.map((item) => {
              const disp = disponibilidad[item.cardId];
              const img = item.img || 'https://placehold.co/80x80?text=Sin';
              return (
                <Paper key={item.cardId} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box component="img" src={img} alt={item.cardName}
                      sx={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }} />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700 }} noWrap>{item.cardName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cantidad: 1 (cartas únicas)
                      </Typography>
                      {verificando ? (
                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                          <CircularProgress size={12} /><Typography variant="caption" color="text.secondary">Verificando…</Typography>
                        </Stack>
                      ) : disp && !disp.ok ? (
                        <Chip icon={<BadIcon />} size="small" color="error" label={disp.motivo} sx={{ mt: 0.5 }} />
                      ) : (
                        <Chip icon={<OkIcon />} size="small" color="success" label="Disponible" sx={{ mt: 0.5 }} />
                      )}
                    </Box>
                    <Typography sx={{ fontWeight: 800 }}>{fmt(item.price)}</Typography>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeFromCart(item.cardId)}
                    >
                      Quitar
                    </Button>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>

          <Button component={Link} to="/cards" sx={{ mt: 2 }} startIcon={<BrowseIcon />}>
            Seguir comprando
          </Button>
        </Box>

        {/* Resumen */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, width: { xs: '100%', md: 340 }, position: { md: 'sticky' }, top: { md: 90 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
            Resumen del pedido
          </Typography>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Subtotal ({items.length} artículo{items.length > 1 ? 's' : ''})</Typography>
              <Typography sx={{ fontWeight: 600 }}>{fmt(subtotal)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Envío estimado</Typography>
              <Typography sx={{ fontWeight: 600 }}>{fmt(ENVIO)}</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 800 }}>TOTAL</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>{fmt(subtotal + ENVIO)}</Typography>
            </Stack>
          </Stack>

          {verificando && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
              Verificando disponibilidad de las cartas…
            </Typography>
          )}
          {!verificando && noDisponibles.length > 0 && (
            <Alert severity="warning" sx={{ mt: 1.5 }}>
              Quita {noDisponibles.length === 1 ? 'la carta no disponible' : 'las cartas no disponibles'} para continuar.
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<CheckoutIcon />}
            disabled={!todosOk}
            onClick={() => navigate('/checkout')}
            sx={{ mt: 2 }}
          >
            Finalizar compra
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
            El envío se calcula en el siguiente paso
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};
