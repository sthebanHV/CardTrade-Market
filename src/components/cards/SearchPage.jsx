import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Stack, Chip, Alert, Paper, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import { marketAPI } from '../../api/apiClient';

const JUEGOS = [
  { key: 'ALL', label: 'Todos los juegos' },
  { key: 'POKEMON', label: 'Pokémon' },
  { key: 'MAGIC', label: 'Magic' },
  { key: 'YUGIOH', label: 'Yu-Gi-Oh!' },
];

const MarketResult = ({ card }) => (
  <Paper sx={{ overflow: 'hidden', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
    <Box component="img" src={card.image || '/assets/card-fallback.svg'} alt={card.name || 'Carta'} sx={{ width: '100%', height: 250, objectFit: 'contain', bgcolor: '#101827', p: 1 }} onError={(e) => { e.currentTarget.src = '/assets/card-fallback.svg'; }} />
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Typography sx={{ fontWeight: 800 }} noWrap title={card.name}>{card.name}</Typography>
      <Typography color="text.secondary" sx={{ fontSize: 13, mt: .5 }} noWrap>{card.setName || 'Set no disponible'}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
        <Chip size="small" label={card.game} variant="outlined" />
        <Typography color="success.dark" sx={{ fontWeight: 800 }}>{card.priceUsd != null ? `$${Number(card.priceUsd).toFixed(2)} USD` : 'Sin precio'}</Typography>
      </Stack>
    </Box>
  </Paper>
);

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const game = searchParams.get('game') || 'ALL';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!q.trim()) { setResults([]); setLoading(false); return undefined; }
    let active = true;
    setLoading(true);
    setError(false);
    marketAPI.search(q.trim(), game === 'ALL' ? undefined : game, 12)
      .then((data) => active && setResults(data?.results || []))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [q, game]);

  const setGame = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'ALL') next.delete('game'); else next.set('game', value);
    setSearchParams(next, { replace: true });
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>{q ? <>Resultados de mercado para “{q}”</> : 'Buscar cartas'}</Typography>
      {!loading && !error && q && <Typography color="text.secondary" sx={{ mb: 3 }}>{results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrados</Typography>}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="juego-label">Juego</InputLabel>
          <Select labelId="juego-label" label="Juego" value={game} onChange={(e) => setGame(e.target.value)}>
            {JUEGOS.map((item) => <MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
      {loading && <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} variant="rounded" height={360} />)}</Box>}
      {error && <Alert severity="error">No se pudo consultar el mercado. Intenta más tarde.</Alert>}
      {!loading && !error && q && results.length === 0 && <Box sx={{ textAlign: 'center', py: 8 }}><SearchOffIcon sx={{ fontSize: 54, color: 'text.disabled' }} /><Typography variant="h6" sx={{ mt: 1 }}>No encontramos cartas para “{q}”</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>Prueba con otro nombre o cambia de juego.</Typography></Box>}
      {!loading && !error && results.length > 0 && <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>{results.map((card) => <MarketResult key={`${card.game}-${card.externalId}`} card={card} />)}</Box>}
    </Box>
  );
};
