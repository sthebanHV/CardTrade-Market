import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, Grid,
  CircularProgress, Alert, Card, CardMedia, CardContent, CardActions,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { favoritesAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export const FavoritesPage = () => {
  const showToast = useStore((s) => s.showToast);
  const token = useStore((s) => s.token);
  const addToCart = useStore((s) => s.addToCart);
  const removeFromFavorites = useStore((s) => s.removeFromFavorites);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setCargando(false);
      return;
    }
    favoritesAPI.list()
      .then((data) => setItems(data || []))
      .catch(() => setError('No se pudieron cargar tus favoritos.'))
      .finally(() => setCargando(false));
  }, [token]);

  const quitar = async (f) => {
    removeFromFavorites(f.cardId);
    setItems((prev) => prev.filter((x) => x.id !== f.id));
    try {
      await favoritesAPI.remove(f.cardId);
      showToast({ message: 'Eliminado de favoritos', severity: 'success' });
    } catch {
      showToast({ message: 'No se pudo eliminar', severity: 'error' });
    }
  };

  const agregarCarrito = (c) => {
    addToCart(c.id, c.nombre, c.precioOferta ?? c.precio, c.imagenes?.[0]);
    showToast({ message: 'Agregado al carrito', severity: 'success' });
  };

  if (cargando) return <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>;

  const validos = items.filter((f) => f.card);
  const eliminados = items.filter((f) => !f.card);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Favoritos</Typography>
          <Typography variant="body2" color="text.secondary">
            {validos.length} carta{validos.length !== 1 ? 's' : ''} guardada{validos.length !== 1 ? 's' : ''} · US-41
          </Typography>
        </Box>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {validos.length === 0 && eliminados.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <FavoriteIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>Aún no tienes favoritos</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Toca el corazón en cualquier carta para guardarla aquí.
          </Typography>
          <Button variant="contained" component={Link} to="/catalog">Explorar catálogo</Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {validos.map((f) => (
            <Grid item xs={12} sm={6} md={4} key={f.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={f.card.imagenes?.[0] || 'https://placehold.co/400x300?text=CardTrade'}
                  alt={f.card.nombre}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography component={Link} to={`/cards/${f.card.id}`}
                    sx={{ fontWeight: 700, textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    {f.card.nombre}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label={f.card.tipo} size="small" />
                    {f.card.rarity && <Chip label={f.card.rarity} size="small" variant="outlined" />}
                    {f.card.status === 'VENDIDO' && <Chip label="Vendido" size="small" color="error" />}
                  </Stack>
                  <Typography sx={{ mt: 1.5, fontWeight: 800 }}>
                    {fmt(f.card.precioOferta ?? f.card.precio)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button size="small" startIcon={<CartIcon />} variant="contained"
                    disabled={f.card.status === 'VENDIDO'}
                    onClick={() => agregarCarrito(f.card)}>
                    Al carrito
                  </Button>
                  <IconButton color="error" size="small" onClick={() => quitar(f)} aria-label="Quitar de favoritos">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {eliminados.length > 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {eliminados.length} favorito(s) de cartas que ya no existen.
        </Alert>
      )}
    </Box>
  );
};
