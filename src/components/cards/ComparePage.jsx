import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Grid, Typography, Button, Chip, Stack, Paper, CircularProgress, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Close as CloseIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { cardsAPI, usersAPI } from '../../api/apiClient';
import { useStore } from '../../store';

export const ComparePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const idsParam = searchParams.get('ids') || '';
  const ids = idsParam.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 3);

  const [cards, setCards] = useState([]);
  const [sellers, setSellers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const addToCart = useStore((s) => s.addToCart);
  const removeCompare = useStore((s) => s.removeCompare);

  useEffect(() => {
    if (ids.length === 0) {
      setCards([]);
      setLoading(false);
      return;
    }
    let activo = true;
    setLoading(true);
    cardsAPI
      .compare(ids)
      .then(async (data) => {
        if (!activo) return;
        setCards(data || []);
        const entries = await Promise.all(
          (data || []).map(async (c) => {
            if (!c.vendedorId) return [c.id, null];
            try {
              return [c.id, await usersAPI.getPublic(c.vendedorId)];
            } catch {
              return [c.id, null];
            }
          })
        );
        if (activo) setSellers(Object.fromEntries(entries));
      })
      .catch(() => activo && setError(true))
      .finally(() => activo && setLoading(false));
    return () => { activo = false; };
  }, [idsParam]);

  const quitar = (id) => {
    const restantes = ids.filter((x) => x !== id);
    const next = new URLSearchParams(searchParams);
    if (restantes.length) next.set('ids', restantes.join(','));
    else next.delete('ids');
    setSearchParams(next, { replace: true });
  };

  const filas = [
    ['Juego', (c) => c.tipo],
    ['Rareza', (c) => c.rarity],
    ['Set', (c) => c.edition],
    ['Estado', (c) => c.condition],
    ['Precio', (c) => `$${Number(c.precioOferta ?? c.precio).toFixed(2)}`],
    ['Vendedor', (c) => sellers[c.id]?.username || '—'],
    ['Rating vendedor', (c) => Number(sellers[c.id]?.rating || 0).toFixed(1)],
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Comparar cartas {ids.length > 0 && `(${ids.length} seleccionada${ids.length > 1 ? 's' : ''})`}
      </Typography>

      {ids.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontSize: 44 }}>⚖️</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>No hay cartas seleccionadas</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Agrega hasta 3 cartas desde el catálogo usando el botón de comparación.
          </Typography>
          <Button component={Link} to="/cards" variant="contained" sx={{ mt: 2 }}>Ir al catálogo</Button>
        </Box>
      )}

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">No se pudieron cargar las cartas a comparar.</Alert>}

      {!loading && !error && cards.length > 0 && (
        <>
          <Grid container spacing={2} sx={{ my: 2 }}>
            {cards.map((c) => (
              <Grid item xs={12} sm={4} key={c.id}>
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 3, position: 'relative' }}>
                  <Button
                    size="small"
                    onClick={() => quitar(c.id)}
                    startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                    color="inherit"
                    sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.9)', zIndex: 2 }}
                  >
                    Quitar
                  </Button>
                  <Box component="img"
                    src={c.imagenes?.[0] || 'https://placehold.co/300x200?text=Sin+Imagen'}
                    alt={c.nombre}
                    sx={{ width: '100%', height: 140, objectFit: 'contain', borderRadius: 2 }} />
                  <Typography sx={{ fontWeight: 700, mt: 1 }} noWrap>{c.nombre}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, width: 180 }}>Característica</TableCell>
                  {cards.map((c) => (
                    <TableCell key={c.id} sx={{ fontWeight: 800 }}>{c.nombre}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filas.map(([label, get]) => {
                  const valores = cards.map((c) => String(get(c) ?? '—'));
                  const distintos = new Set(valores).size > 1;
                  return (
                    <TableRow key={label}>
                      <TableCell color="text.secondary" sx={{ fontWeight: 600 }}>{label}</TableCell>
                      {valores.map((v, i) => (
                        <TableCell key={i} sx={{ bgcolor: distintos ? 'warning.light' : 'inherit', fontWeight: distintos ? 700 : 400 }}>
                          {v}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Acciones</TableCell>
                  {cards.map((c) => (
                    <TableCell key={c.id}>
                      <Button
                        size="small" variant="contained" startIcon={<CartIcon sx={{ fontSize: 16 }} />}
                        onClick={() => addToCart(c.id, c.nombre, c.precioOferta ?? c.precio, c.imagenes?.[0])}
                      >
                        Comprar
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};
