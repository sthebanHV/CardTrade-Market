import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Chip, Skeleton, Stack } from '@mui/material';
import { platformAPI } from '../../api/apiClient';

const iconos = { pokemon: '🎨', magic: '🔥', 'yu-gi-oh!': '⚡' };

export const GamesPage = () => {
  const [cats, setCats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    platformAPI.categories().then(setCats).catch(() => setError(true));
  }, []);

  if (error) {
    return <Typography color="error">No se pudieron cargar las categorías.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Categorías de juegos</Typography>
      <Grid container spacing={3}>
        {(cats === null ? [1, 2, 3, 4] : cats).map((cat, i) => {
          const juego = typeof cat === 'object' ? cat.juego : null;
          if (!juego) {
            return (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rectangular" height={170} sx={{ borderRadius: 3 }} />
              </Grid>
            );
          }
          return (
            <Grid item xs={12} sm={6} md={3} key={juego}>
              <Box
                component={Link}
                to={`/cards/game/${encodeURIComponent(juego)}`}
                sx={{
                  display: 'block', textDecoration: 'none', textAlign: 'center',
                  p: 4, borderRadius: 3, bgcolor: 'background.paper',
                  border: '1px solid', borderColor: 'divider',
                  transition: 'transform .15s, box-shadow .15s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: 6, borderColor: 'primary.main' },
                }}
              >
                <Typography sx={{ fontSize: 52 }}>{iconos[juego.toLowerCase()] || '🎯'}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', textTransform: 'uppercase', mt: 1 }}>
                  {juego}
                </Typography>
                <Chip label={`${Number(cat.cantidad).toLocaleString('es')} cartas`} size="small" sx={{ mt: 1 }} />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 5, p: 3, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
          Explora por juego
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {(cats || []).map((c) => (
            <Chip
              key={c.juego}
              component={Link}
              to={`/cards/game/${encodeURIComponent(c.juego)}`}
              label={c.juego}
              clickable
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
