import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem,
  TextField, Stack, Chip, CircularProgress, Alert, Paper, Checkbox, FormControlLabel,
  FormGroup, Divider, InputAdornment,
} from '@mui/material';
import { FilterAltOff as ClearIcon, Close as CloseIcon } from '@mui/icons-material';
import { CardCard } from './CardCard';
import { cardsAPI } from '../../api/apiClient';

const JUEGOS = ['pokemon', 'magic', 'yu-gi-oh!', 'otros'];
const ESTADOS = ['NM', 'LP', 'MP', 'HP'];

const FilterSection = ({ title, children }) => (
  <Box sx={{ mb: 2.5 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
    {children}
  </Box>
);

export const CatalogPage = ({ gameFromPath }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const q = searchParams.get('q') || '';
  const game = gameFromPath || searchParams.get('game') || '';
  const rarity = searchParams.get('rarity') || '';
  const condition = searchParams.get('condition') || '';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';
  const sort = searchParams.get('sort') || '';

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(false);
    const params = {};
    if (q) params.q = q;
    if (game) params.game = game;
    if (rarity) params.rarity = rarity;
    if (condition) params.condition = condition;
    if (priceMin) params.priceMin = priceMin;
    if (priceMax) params.priceMax = priceMax;
    if (sort) params.sort = sort;
    cardsAPI
      .getAll(params)
      .then((data) => {
        if (!activo) return;
        setCards(data || []);
        if (!rarity) {
          const raras = [...new Set((data || []).map((c) => c.rarity).filter(Boolean))];
          setRarities(raras);
        }
      })
      .catch(() => activo && setError(true))
      .finally(() => activo && setLoading(false));
    return () => { activo = false; };
  }, [q, game, rarity, condition, priceMin, priceMax, sort]);

  const activos = useMemo(() => {
    const list = [];
    if (q) list.push(['q', `“${q}”`]);
    if (game) list.push(['game', game]);
    if (rarity) list.push(['rarity', rarity]);
    if (condition) list.push(['condition', `Estado: ${condition}`]);
    if (priceMin) list.push(['priceMin', `Desde $${priceMin}`]);
    if (priceMax) list.push(['priceMax', `Hasta $${priceMax}`]);
    return list;
  }, [q, game, rarity, condition, priceMin, priceMax]);

  const limpiar = () => setSearchParams(gameFromPath ? {} : {}, { replace: true });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        {game ? `Catálogo · ${game}` : 'Catálogo de cartas'}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {loading ? 'Cargando…' : `Resultados (${cards.length} ${cards.length === 1 ? 'carta' : 'cartas'})`}
      </Typography>

      <Grid container spacing={3}>
        {/* Sidebar de filtros */}
        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 17 }}>Filtros</Typography>
              <Button size="small" startIcon={<ClearIcon />} onClick={limpiar} disabled={activos.length === 0}>
                Limpiar
              </Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <FilterSection title="Juego">
              <FormGroup>
                {JUEGOS.map((j) => (
                  <FormControlLabel
                    key={j}
                    control={
                      <Checkbox
                        size="small"
                        checked={game.toLowerCase() === j}
                        onChange={() => setParam('game', game.toLowerCase() === j ? '' : j)}
                      />
                    }
                    label={<Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{j}</Typography>}
                  />
                ))}
              </FormGroup>
            </FilterSection>

            <FilterSection title="Rareza">
              <FormGroup>
                {rarities.map((r) => (
                  <FormControlLabel
                    key={r}
                    control={
                      <Checkbox
                        size="small"
                        checked={rarity === r}
                        onChange={() => setParam('rarity', rarity === r ? '' : r)}
                      />
                    }
                    label={<Typography variant="body2">{r}</Typography>}
                  />
                ))}
                {rarities.length === 0 && (
                  <Typography variant="body2" color="text.secondary">Sin datos</Typography>
                )}
              </FormGroup>
            </FilterSection>

            <FilterSection title="Precio (USD)">
              <Stack direction="row" spacing={1}>
                <TextField
                  type="number" placeholder="Mín" value={priceMin} size="small"
                  onChange={(e) => setParam('priceMin', e.target.value)} sx={{ flex: 1 }}
                  inputProps={{ min: 0, 'aria-label': 'Precio mínimo' }}
                />
                <TextField
                  type="number" placeholder="Máx" value={priceMax} size="small"
                  onChange={(e) => setParam('priceMax', e.target.value)} sx={{ flex: 1 }}
                  inputProps={{ min: 0, 'aria-label': 'Precio máximo' }}
                />
              </Stack>
            </FilterSection>

            <FilterSection title="Estado">
              <FormGroup row>
                {ESTADOS.map((c) => (
                  <FormControlLabel
                    key={c}
                    control={
                      <Checkbox
                        size="small"
                        checked={condition === c}
                        onChange={() => setParam('condition', condition === c ? '' : c)}
                      />
                    }
                    label={<Typography variant="body2">{c}</Typography>}
                  />
                ))}
              </FormGroup>
            </FilterSection>
          </Paper>
        </Grid>

        {/* Resultados */}
        <Grid item xs={12} md={9}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="sort-label">Ordenar por</InputLabel>
              <Select
                labelId="sort-label"
                label="Ordenar por"
                value={sort}
                onChange={(e) => setParam('sort', e.target.value)}
              >
                <MenuItem value="">Más recientes</MenuItem>
                <MenuItem value="price_asc">Precio: menor a mayor</MenuItem>
                <MenuItem value="price_desc">Precio: mayor a menor</MenuItem>
                <MenuItem value="discount">Mayor descuento</MenuItem>
                <MenuItem value="name">Nombre (A-Z)</MenuItem>
              </Select>
            </FormControl>
            {activos.map(([key, label]) => (
              <Chip
                key={key}
                label={label}
                onDelete={() => setParam(key, '')}
                deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error">No se pudo cargar el catálogo. Intenta más tarde.</Alert>
          )}

          {!loading && !error && cards.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ fontSize: 44 }}>🃏</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>No se encontraron cartas</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Prueba a limpiar los filtros o busca con otras palabras.
              </Typography>
              <Button onClick={limpiar} variant="outlined" sx={{ mt: 2 }}>Limpiar filtros</Button>
            </Box>
          )}

          {!loading && !error && cards.length > 0 && (
            <Grid container spacing={3}>
              {cards.map((card) => (
                <Grid item xs={12} sm={6} lg={4} key={card.id}>
                  <CardCard card={card} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
