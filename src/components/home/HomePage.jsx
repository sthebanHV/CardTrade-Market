import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography, Chip, Stack, Skeleton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { SportsEsports as GamesIcon, LocalOffer as OfferIcon, Star as StarIcon } from '@mui/icons-material';
import { CardCard } from '../cards/CardCard';
import { cardsAPI, platformAPI } from '../../api/apiClient';

const juegosIcono = { pokemon: '🎨', magic: '🔥', 'yu-gi-oh!': '⚡' };

const Section = ({ title, action, children }) => (
  <Box sx={{ mt: 6 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>{title}</Typography>
      {action}
    </Stack>
    {children}
  </Box>
);

export const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [cats, setCats] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    Promise.all([
      cardsAPI.featured().catch(() => []),
      cardsAPI.recent().catch(() => []),
      platformAPI.categories().catch(() => []),
      platformAPI.stats().catch(() => null),
    ]).then(([f, r, c, s]) => {
      if (!activo) return;
      setFeatured(f);
      setRecent(r);
      setCats(c);
      setStats(s);
      setLoading(false);
    });
    return () => { activo = false; };
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Hero */}
      <Box
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(120deg, #1E40AF 0%, #3B82F6 55%, #60A5FA 100%)',
          color: '#fff',
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: 56 }}>🃏</Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mt: 1 }}>
          Encuentra cartas raras para tu colección
        </Typography>
        <Typography sx={{ mt: 1.5, opacity: 0.9, maxWidth: 640, mx: 'auto' }}>
          Compra, vende y comercia cartas de Pokémon, Magic y Yu-Gi-Oh! con vendedores
          verificados de toda la comunidad.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mt: 4 }}>
          <Button component={Link} to="/cards" variant="contained" size="large"
            sx={{ bgcolor: '#fff', color: 'primary.dark', px: 4, '&:hover': { bgcolor: '#EFF6FF' } }}>
            Explorar cartas
          </Button>
          <Button component={Link} to="/offers" variant="outlined" size="large"
            startIcon={<OfferIcon />}
            sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.6)', px: 4, '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
            Ver ofertas
          </Button>
        </Stack>
      </Box>

      {/* Categorías por juego */}
      <Section title="Categorías por juego" action={<Button component={Link} to="/games" endIcon={<GamesIcon />}>Ver todas</Button>}>
        <Grid container spacing={2.5}>
          {(loading ? [1, 2, 3] : cats.slice(0, 3)).map((cat, i) => {
            const juego = typeof cat === 'object' ? cat.juego : `juego-${i}`;
            const cantidad = typeof cat === 'object' ? cat.cantidad : null;
            return (
              <Grid item xs={12} sm={4} key={juego}>
                <Box
                  component={Link}
                  to={`/cards/game/${encodeURIComponent(juego)}`}
                  sx={{
                    display: 'block', textDecoration: 'none', textAlign: 'center',
                    p: 3, borderRadius: 3, bgcolor: 'background.paper',
                    border: '1px solid', borderColor: 'divider',
                    transition: 'transform .15s, box-shadow .15s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
                  }}
                >
                  <Typography sx={{ fontSize: 44 }}>
                    {juegosIcono[juego.toLowerCase()] || '🎯'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', textTransform: 'capitalize', mt: 1 }}>
                    {juego}
                  </Typography>
                  {cantidad != null && (
                    <Typography variant="body2" color="text.secondary">
                      {cantidad.toLocaleString('es')} cartas
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Section>

      {/* Destacadas */}
      <Section title="Cartas destacadas" action={<Button component={Link} to="/cards">Ver catálogo</Button>}>
        <Grid container spacing={3}>
          {(loading ? [1, 2, 3, 4] : featured).map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={card?.id || i}>
              {loading ? <Skeleton variant="rectangular" height={330} sx={{ borderRadius: 3 }} /> : <CardCard card={card} />}
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Recientes */}
      <Section title="Publicaciones recientes" action={<Button component={Link} to="/cards">Ver más</Button>}>
        <Grid container spacing={3}>
          {(loading ? [1, 2, 3, 4] : recent).map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={card?.id || i}>
              {loading ? <Skeleton variant="rectangular" height={330} sx={{ borderRadius: 3 }} /> : <CardCard card={card} />}
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Estadísticas */}
      <Box sx={{ mt: 6, mb: 2, p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: 'primary.dark', color: '#fff', textAlign: 'center' }}>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <StarIcon sx={{ color: '#F59E0B' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>CardTrade Market en números</Typography>
        </Stack>
        <Grid container spacing={3}>
          {[
            [stats?.usuarios, 'Usuarios'],
            [stats?.cartas, 'Cartas publicadas'],
            [stats?.ventas, 'Ventas realizadas'],
          ].map(([valor, label]) => (
            <Grid item xs={12} sm={4} key={label}>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {valor != null ? Number(valor).toLocaleString('es') : '—'}
              </Typography>
              <Typography sx={{ opacity: 0.85 }}>{label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
