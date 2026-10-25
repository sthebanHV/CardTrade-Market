import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Grid, Typography, Button, Chip, Stack, Paper, CircularProgress, Alert,
} from '@mui/material';
import { LocalOffer as OfferIcon, ShoppingCart as CartIcon, Timer as TimerIcon } from '@mui/icons-material';
import { cardsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const Countdown = ({ until }) => {
  const [, force] = useState(0);
  useEffect(() => {
    const t = setInterval(() => force((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const restante = new Date(until).getTime() - Date.now();
  if (restante <= 0) return <Typography variant="body2" color="error" sx={{ fontWeight: 700 }}>Oferta finalizada</Typography>;

  const dias = Math.floor(restante / 86400000);
  const horas = Math.floor((restante % 86400000) / 3600000);
  const min = Math.floor((restante % 3600000) / 60000);
  const seg = Math.floor((restante % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <Typography variant="body2" color="text.secondary">
      Oferta termina en:{' '}
      <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
        {dias > 0 ? `${dias}d ` : ''}{pad(horas)}:{pad(min)}:{pad(seg)}
      </Box>
    </Typography>
  );
};

const OfferCard = ({ card }) => {
  const addToCart = useStore((s) => s.addToCart);
  const descuento = Math.round((1 - card.precioOferta / card.precio) * 100);

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chip
        label={`-${descuento}%`}
        color="error"
        sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2, fontWeight: 800 }}
      />
      <Box
        component={Link}
        to={`/cards/${card.id}`}
        sx={{ display: 'block' }}
      >
        <Box
          component="img"
          src={card.imagenes?.[0] || 'https://placehold.co/300x200?text=Sin+Imagen'}
          alt={card.nombre}
          sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2 }}
        />
      </Box>
      <Typography component={Link} to={`/cards/${card.id}`}
        sx={{ fontWeight: 700, mt: 1.5, color: 'text.primary', textDecoration: 'none' }} noWrap>
        {card.nombre}
      </Typography>
      <Chip size="small" label={card.tipo} sx={{ alignSelf: 'flex-start', mt: 0.75 }} color="primary" />
      <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 1.5, mb: 1 }}>
        <Typography variant="h6" color="error" sx={{ fontWeight: 800 }}>
          ${Number(card.precioOferta).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
          ${Number(card.precio).toFixed(2)}
        </Typography>
      </Stack>
      {card.ofertaExpira && <Countdown until={card.ofertaExpira} />}
      <Button
        variant="contained" startIcon={<CartIcon />} sx={{ mt: 'auto', pt: 1 }}
        onClick={() => addToCart(card.id, card.nombre, card.precioOferta, card.imagenes?.[0])}
      >
        Agregar al carrito
      </Button>
    </Paper>
  );
};

export const OffersPage = () => {
  const [offers, setOffers] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    cardsAPI.offers().then(setOffers).catch(() => setError(true));
  }, []);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <OfferIcon color="error" sx={{ fontSize: 34 }} />
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Ofertas especiales</Typography>
      </Stack>

      {error && <Alert severity="error">No se pudieron cargar las ofertas.</Alert>}
      {offers === null && !error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      )}

      {offers !== null && !error && offers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontSize: 44 }}>🏷️</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>No hay ofertas activas ahora mismo</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Vuelve pronto — nuevas ofertas se publican cada semana.
          </Typography>
          <Button component={Link} to="/cards" variant="outlined" sx={{ mt: 2 }}>Ver catálogo</Button>
        </Box>
      )}

      {offers !== null && offers.length > 0 && (
        <Grid container spacing={3}>
          {offers.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <OfferCard card={card} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
