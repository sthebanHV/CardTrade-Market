import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Typography, Button, Stack, Chip, CircularProgress, Alert, Paper,
  FormControl, InputLabel, Select, MenuItem, Divider, IconButton, Tooltip, Pagination,
} from '@mui/material';
import { Favorite as FavoriteIcon, ShoppingCart as CartIcon, Star as StarIcon } from '@mui/icons-material';
import { cardsAPI, usersAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const POR_PAGINA = 10;

const ResultRow = ({ card }) => {
  const addToCart = useStore((s) => s.addToCart);
  const addToFavorites = useStore((s) => s.addToFavorites);
  const favorites = useStore((s) => s.favorites);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    if (!card.vendedorId) return;
    let activo = true;
    usersAPI.getPublic(card.vendedorId).then((u) => activo && setSeller(u)).catch(() => {});
    return () => { activo = false; };
  }, [card.vendedorId]);

  const enOferta = card.precioOferta != null && card.precioOferta < card.precio;
  const precioFinal = enOferta ? card.precioOferta : card.precio;
  const esFavorito = favorites.some((f) => f.cardId === card.id);

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box
        component="img"
        src={card.imagenes?.[0] || 'https://placehold.co/120x90?text=Sin+Imagen'}
        alt={card.nombre}
        sx={{ width: 110, height: 88, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          component={Link}
          to={`/cards/${card.id}`}
          sx={{ fontWeight: 700, color: 'text.primary', textDecoration: 'none', fontSize: 17 }}
        >
          {card.nombre}
        </Typography>
        <Stack direction="row" spacing={0.75} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip size="small" label={card.tipo} color="primary" />
          {card.rarity && <Chip size="small" label={card.rarity} variant="outlined" />}
          {card.condition && <Chip size="small" label={card.condition} variant="outlined" color="success" />}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.75 }}>
          <Typography variant="body2" color="text.secondary">
            Vendedor: {seller?.username || '…'}
          </Typography>
          <StarIcon sx={{ fontSize: 15, color: '#F59E0B' }} />
          <Typography variant="body2" color="text.secondary">
            {seller ? Number(seller.rating || 0).toFixed(1) : '—'}
          </Typography>
        </Stack>
      </Box>
      <Stack alignItems="flex-end" spacing={1}>
        <Typography variant="h6" color={enOferta ? 'error' : 'primary'} sx={{ fontWeight: 800 }}>
          ${Number(precioFinal).toFixed(2)}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Button size="small" variant="contained" startIcon={<CartIcon sx={{ fontSize: 16 }} />}
            onClick={() => addToCart(card.id, card.nombre, precioFinal)}>
            Carrito
          </Button>
          <Tooltip title="Favorito">
            <IconButton size="small" color={esFavorito ? 'error' : 'default'}
              onClick={() => addToFavorites(card.id, card.nombre)}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page') || 1);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }
    let activo = true;
    setLoading(true);
    setError(false);
    cardsAPI
      .search(q)
      .then((data) => activo && setResults(data || []))
      .catch(() => activo && setError(true))
      .finally(() => activo && setLoading(false));
    return () => { activo = false; };
  }, [q]);

  const ordenados = [...results].sort((a, b) => {
    if (sort === 'price_asc') return a.precio - b.precio;
    if (sort === 'price_desc') return b.precio - a.precio;
    return new Date(b.fechaPublicacion || 0) - new Date(a.fechaPublicacion || 0);
  });

  const totalPaginas = Math.max(1, Math.ceil(ordenados.length / POR_PAGINA));
  const visibles = ordenados.slice((page - 1) * POR_PAGINA, page * POR_PAGINA);

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('sort', value);
    else next.delete('sort');
    next.delete('page');
    setSearchParams(next, { replace: true });
  };

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {q ? <>Resultados para “{q}”</> : 'Buscar cartas'}
      </Typography>
      {!loading && !error && (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {ordenados.length} {ordenados.length === 1 ? 'resultado' : 'resultados'} encontrados
        </Typography>
      )}

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="ordenar">Ordenar por</InputLabel>
          <Select labelId="ordenar" label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="">Más recientes</MenuItem>
            <MenuItem value="price_asc">Precio: menor a mayor</MenuItem>
            <MenuItem value="price_desc">Precio: mayor a menor</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      )}

      {error && <Alert severity="error">No se pudo realizar la búsqueda. Intenta más tarde.</Alert>}

      {!loading && !error && q && results.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontSize: 44 }}>🔍</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>Sin resultados para “{q}”</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Prueba con otro nombre, juego o descripción.
          </Typography>
        </Box>
      )}

      {!loading && !error && visibles.length > 0 && (
        <Stack spacing={2}>
          {visibles.map((card) => <ResultRow key={card.id} card={card} />)}
        </Stack>
      )}

      {totalPaginas > 1 && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={totalPaginas}
            page={page}
            onChange={(_, p) => {
              const next = new URLSearchParams(searchParams);
              next.set('page', String(p));
              setSearchParams(next);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
};
