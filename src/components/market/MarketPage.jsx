import { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, TextField, ToggleButton, ToggleButtonGroup, Chip, Card,
  CardActionArea, CardContent, CardMedia, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Stack, Skeleton, InputAdornment,
  Divider, Paper, Link,
} from '@mui/material';
import {
  Search as SearchIcon, OpenInNew as OpenIcon, QueryStats as StatsIcon,
  ImageNotSupported as NoImageIcon,
} from '@mui/icons-material';
import { marketAPI } from '../../api/apiClient';

const JUEGOS = [
  { key: 'ALL', label: 'Todos' },
  { key: 'MAGIC', label: 'Magic' },
  { key: 'POKEMON', label: 'Pokémon' },
  { key: 'YUGIOH', label: 'Yu-Gi-Oh!' },
];

const SUGERENCIAS = [
  'Charizard',
  'Pikachu',
  'Lightning Bolt',
  'Black Lotus',
  'Blue-Eyes White Dragon',
];

const ATTRIBUCION =
  'Datos y precios de mercado: Scryfall (Magic: The Gathering) · YGOPRODeck (Yu-Gi-Oh!) · Pokémon TCG API / TCGdex. Los precios son referencias diarias del mercado, no garantizan disponibilidad.';

export const MarketPage = () => {
  const [juego, setJuego] = useState('ALL');
  const [q, setQ] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [error, setError] = useState('');
  const [abierto, setAbierto] = useState(null); // MarketCard
  const [detalle, setDetalle] = useState(null); // MarketCard.Detail
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const debounceRef = useRef(null);
  const reqRef = useRef(0);

  const buscar = async (query, gameKey) => {
    const texto = (query ?? q).trim();
    const g = gameKey ?? juego;
    if (texto.length < 2) {
      setResultados([]);
      setUnavailable([]);
      setError('');
      return;
    }
    const id = ++reqRef.current;
    setCargando(true);
    setError('');
    try {
      const data = await marketAPI.search(texto, g === 'ALL' ? undefined : g, 12);
      if (id !== reqRef.current) return;
      setResultados(data.results || []);
      setUnavailable(data.unavailable || []);
    } catch {
      if (id !== reqRef.current) return;
      setError('No se pudo consultar el mercado. Intenta de nuevo.');
      setResultados([]);
    } finally {
      if (id === reqRef.current) setCargando(false);
    }
  };

  const onQuery = (valor) => {
    setQ(valor);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => buscar(valor), 400);
  };

  useEffect(() => {
    if (q.trim().length >= 2) buscar(q, juego);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [juego]);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const abrirDetalle = async (card) => {
    setAbierto(card);
    setDetalle(null);
    setCargandoDetalle(true);
    try {
      const d = await marketAPI.card(card.game, card.externalId);
      setDetalle(d);
    } catch {
      setDetalle(null);
    } finally {
      setCargandoDetalle(false);
    }
  };

  const cambiarJuego = (_e, nuevo) => {
    if (nuevo) setJuego(nuevo);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <StatsIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" sx={{ fontWeight: 800 }}>Precios de mercado</Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Consulta cartas reales con su imagen oficial y su precio actual de mercado.
      </Typography>

      <Paper sx={{ p: 2.5, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={juego}
            onChange={cambiarJuego}
            aria-label="juego"
          >
            {JUEGOS.map((j) => (
              <ToggleButton key={j.key} value={j.key}>{j.label}</ToggleButton>
            ))}
          </ToggleButtonGroup>
          <TextField
            fullWidth
            size="small"
            placeholder="Busca una carta: Charizard, Lightning Bolt, Blue-Eyes…"
            value={q}
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') buscar(q); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
              ),
            }}
          />
        </Stack>

        {unavailable.length > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Fuente no disponible temporalmente: {unavailable.join(', ')}. Prueba con otro juego.
          </Alert>
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Divider sx={{ my: 2.5 }} />

        {cargando ? (
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        ) : resultados.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <StatsIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
            <Typography sx={{ fontWeight: 700, mt: 1 }}>
              {q.trim().length >= 2 ? 'Sin resultados' : 'Busca una carta para ver su precio'}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 14, mb: 2 }}>
              {q.trim().length >= 2
                ? 'Prueba con otro nombre o cambia de juego.'
                : 'Sugerencias:'}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {SUGERENCIAS.map((s) => (
                <Chip key={s} label={s} clickable onClick={() => { setQ(s); buscar(s); }} />
              ))}
            </Stack>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
            {resultados.map((c) => (
              <Card key={`${c.game}-${c.externalId}`} sx={{ borderRadius: 2, height: '100%' }}>
                <CardActionArea onClick={() => abrirDetalle(c)} sx={{ height: '100%' }}>
                  {c.image ? (
                    <CardMedia
                      component="img"
                      image={c.image}
                      alt={c.name}
                      sx={{ height: 270, objectFit: 'contain', background: '#0f172a' }}
                    />
                  ) : (
                    <Box sx={{ height: 270, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'action.hover' }}>
                      <NoImageIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                    </Box>
                  )}
                  <CardContent sx={{ pt: 1.5, pb: '12px !important' }}>
                    <Typography noWrap sx={{ fontWeight: 700, fontSize: 15 }} title={c.name}>
                      {c.name}
                    </Typography>
                    <Typography noWrap color="text.secondary" sx={{ fontSize: 12.5 }}>
                      {[c.setName, c.rarity].filter(Boolean).join(' · ')}
                    </Typography>
                    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 1 }}>
                      {c.priceUsd != null ? (
                        <Chip
                          size="small"
                          color="success"
                          label={`$${Number(c.priceUsd).toFixed(2)} USD`}
                          sx={{ fontWeight: 700 }}
                        />
                      ) : (
                        <Chip size="small" variant="outlined" label="Sin precio" />
                      )}
                      <Chip size="small" variant="outlined" label={c.game} sx={{ fontSize: 11 }} />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Paper>

      <Typography color="text.secondary" sx={{ fontSize: 12.5, mt: 2 }}>
        {ATTRIBUCION}
      </Typography>

      <Dialog open={!!abierto} onClose={() => { setAbierto(null); setDetalle(null); }} maxWidth="sm" fullWidth>
        {abierto && (
          <>
            <DialogTitle sx={{ fontWeight: 800 }}>
              {(detalle || abierto).name}
              <Typography color="text.secondary" sx={{ fontSize: 14, fontWeight: 400 }}>
                {(detalle || abierto).setName || JUEGOS.find((j) => j.key === (detalle || abierto).game)?.label}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 1 }}>
                <Box
                  component="img"
                  src={(detalle || abierto).image}
                  alt={(detalle || abierto).name}
                  sx={{
                    width: 220, maxHeight: 320, objectFit: 'contain', borderRadius: 2,
                    background: '#0f172a', p: 1, alignSelf: 'center',
                  }}
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                />
                <Box sx={{ flex: 1 }}>
                  {cargandoDetalle ? (
                    <Stack spacing={1}>
                      <Skeleton width="60%" /><Skeleton width="40%" /><Skeleton width="80%" height={60} />
                    </Stack>
                  ) : (
                    <>
                      <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                        {(detalle || abierto).rarity && (
                          <Chip size="small" label={(detalle || abierto).rarity} />
                        )}
                        {(detalle || abierto).number && (
                          <Chip size="small" variant="outlined" label={`#${(detalle || abierto).number}`} />
                        )}
                        <Chip size="small" variant="outlined" label={(detalle || abierto).game} />
                      </Stack>
                      {((detalle && detalle.prices && detalle.prices.length > 0)) ? (
                        <Stack spacing={0.75}>
                          {detalle.prices.map((p) => (
                            <Stack key={p.market} direction="row" justifyContent="space-between">
                              <Typography color="text.secondary" sx={{ fontSize: 14 }}>{p.market}</Typography>
                              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                                ${Number(p.valueUsd).toFixed(2)}
                              </Typography>
                            </Stack>
                          ))}
                          <Divider sx={{ my: 0.5 }} />
                          <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontWeight: 700 }}>Referencia</Typography>
                            <Typography sx={{ fontWeight: 800, color: 'success.main' }}>
                              ${(detalle.priceUsd ?? abierto.priceUsd ?? 0).toFixed(2)} USD
                            </Typography>
                          </Stack>
                        </Stack>
                      ) : (detalle || abierto).priceUsd != null ? (
                        <Typography sx={{ fontWeight: 800, color: 'success.main', fontSize: 22 }}>
                          ${(detalle || abierto).priceUsd.toFixed(2)} USD
                        </Typography>
                      ) : (
                        <Typography color="text.secondary">Precio no disponible para esta carta.</Typography>
                      )}
                      {(detalle || abierto).description && (
                        <Typography color="text.secondary" sx={{ fontSize: 13.5, mt: 1.5 }}>
                          {(detalle || abierto).description}
                        </Typography>
                      )}
                      {(detalle || abierto).url && (
                        <Button
                          endIcon={<OpenIcon />}
                          href={(detalle || abierto).url}
                          target="_blank"
                          rel="noreferrer"
                          sx={{ mt: 1.5 }}
                        >
                          Ver en {(detalle || abierto).source}
                        </Button>
                      )}
                      <Typography color="text.secondary" sx={{ fontSize: 12, mt: 1 }}>
                        Actualizado: {(detalle || abierto).updatedAt
                          ? new Date((detalle || abierto).updatedAt).toLocaleString()
                          : 'reciente'}
                      </Typography>
                    </>
                  )}
                </Box>
              </Stack>
              <Typography color="text.secondary" sx={{ fontSize: 12, mt: 2 }}>
                {ATTRIBUCION}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setAbierto(null); setDetalle(null); }}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};
