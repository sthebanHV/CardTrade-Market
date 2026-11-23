import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography, Stack, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { SportsEsports as GamesIcon, LocalOffer as OfferIcon, Star as StarIcon } from '@mui/icons-material';
import { CardCard } from '../cards/CardCard';
import { Reveal } from '../ui/Reveal';
import { cardsAPI, platformAPI } from '../../api/apiClient';

// Ilustraciones originales en /public/assets (SVG propio, sin licencia externa).
// Claves en minúsculas tal como las devuelve /api/categories.
const arteJuego = {
  pokemon: '/assets/booster-pack.svg',
  magic: '/assets/card-stack.svg',
  yuigoh: '/assets/card-sleeve.svg',
  yugioh: '/assets/card-sleeve.svg',
  'yu-gi-oh!': '/assets/card-sleeve.svg',
};

const Section = ({ title, action, children }) => (
  <Reveal sx={{ mt: 6 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>{title}</Typography>
      {action}
    </Stack>
    {children}
  </Reveal>
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
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          backgroundImage: 'linear-gradient(120deg, rgba(23,37,84,.97), rgba(30,64,175,.92) 45%, rgba(59,130,246,.86)), url("/assets/hero-cards.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(30,64,175,0.35)',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 420, height: 420, top: -160, right: -120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147,197,253,.55), transparent 65%)',
            animation: 'heroGlow 12s ease-in-out infinite',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 360, height: 360, bottom: -180, left: -100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,.45), transparent 65%)',
            animation: 'heroGlow 15s ease-in-out infinite reverse',
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontSize: 56, display: 'inline-block', animation: 'floatY 5s ease-in-out infinite' }}>🃏</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.03em', mt: 1 }}>
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
      </Box>

      {/* Categorías por juego */}
      <Section title="Categorías por juego" action={<Button component={Link} to="/games" endIcon={<GamesIcon />}>Ver todas</Button>}>
        <Grid container spacing={2.5} className="ctm-stagger">
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
                    border: '1px solid', borderColor: 'divider', height: '100%',
                    transition: 'transform .3s cubic-bezier(0.22,1,0.36,1), box-shadow .3s ease, border-color .3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)', boxShadow: 5,
                      borderColor: 'primary.light',
                      '& img, & span': { transform: 'scale(1.12)' },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={arteJuego[juego.toLowerCase()] || '/assets/card-stack.svg'}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    sx={{
                      width: 96, height: 124, objectFit: 'contain', mb: 1,
                      display: 'block', mx: 'auto',
                      transition: 'transform .35s cubic-bezier(0.22,1,0.36,1)',
                      filter: 'drop-shadow(0 8px 16px rgba(15,23,42,0.18))',
                    }}
                  />
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
        <Grid container spacing={3} className="ctm-stagger">
          {(loading ? [1, 2, 3, 4] : featured).map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={card?.id || i}>
              {loading ? <Skeleton variant="rectangular" height={330} sx={{ borderRadius: 3 }} className="ctm-skeleton" /> : <CardCard card={card} />}
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Recientes */}
      <Section title="Publicaciones recientes" action={<Button component={Link} to="/cards">Ver más</Button>}>
        <Grid container spacing={3} className="ctm-stagger">
          {(loading ? [1, 2, 3, 4] : recent).map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={card?.id || i}>
              {loading ? <Skeleton variant="rectangular" height={330} sx={{ borderRadius: 3 }} className="ctm-skeleton" /> : <CardCard card={card} />}
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Estadísticas */}
      <Reveal sx={{ mt: 6, mb: 2 }}>
        <Box sx={{
          p: { xs: 3, md: 5 }, borderRadius: 4, textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden',
          backgroundImage: 'linear-gradient(120deg, #172554 0%, #1E40AF 55%, #3B82F6 100%)',
          backgroundSize: '200% 200%',
          animation: 'borderFlow 12s ease infinite',
          boxShadow: '0 24px 60px rgba(30,64,175,0.30)',
          '&::before': {
            content: '""', position: 'absolute', width: 300, height: 300, top: -120, right: -80, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 65%)', pointerEvents: 'none',
          },
        }}>
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            <StarIcon sx={{ color: '#F59E0B' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>CardTrade Market en números</Typography>
          </Stack>
          <Grid container spacing={3} className="ctm-stagger" sx={{ position: 'relative', zIndex: 1 }}>
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
      </Reveal>
    </Container>
  );
};
