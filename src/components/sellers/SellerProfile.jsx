import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box, Paper, Typography, Button, Stack, Chip, Tabs, Tab, Avatar, Rating,
  Alert, CircularProgress, Divider, Grid, useMediaQuery, useTheme,
} from '@mui/material';
import {
  PersonAdd as FollowIcon, PersonRemove as UnfollowIcon, Storefront as StoreIcon,
  Star as StarIcon, Sell as SellIcon, FactCheck as ActiveIcon, Verified as PositiveIcon,
} from '@mui/icons-material';
import { sellersAPI, usersAPI } from '../../api/apiClient';
import { useStore } from '../../store';
import { CardCard } from '../cards/CardCard';

const ESTRELLAS = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];

export const SellerProfile = () => {
  const { username } = useParams();
  const theme = useTheme();
  const anchoMovil = useMediaQuery(theme.breakpoints.down('sm'));
  const { token, user, showToast } = useStore();

  const [perfil, setPerfil] = useState(null);
  const [listings, setListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tab, setTab] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [siguiendo, setSiguiendo] = useState(false);
  const [cargandoFollow, setCargandoFollow] = useState(false);

  useEffect(() => {
    let activo = true;
    setCargando(true);
    setError(false);
    Promise.all([
      sellersAPI.get(username),
      sellersAPI.listings(username),
      sellersAPI.reviews(username),
    ])
      .then(([p, l, r]) => {
        if (!activo) return;
        setPerfil(p);
        setListings(l || []);
        setReviews(r || []);
        setSiguiendo(Boolean(p?.siguiendo));
      })
      .catch(() => activo && setError(true))
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, [username]);

  const toggleFollow = async () => {
    if (!token) {
      showToast({ message: 'Inicia sesión para seguir vendedores', severity: 'info' });
      return;
    }
    setCargandoFollow(true);
    try {
      const res = await sellersAPI.follow(username);
      setSiguiendo(res.following);
      setPerfil((p) => ({ ...p, followers: res.followers }));
      showToast({
        message: res.following ? `Ahora sigues a ${username}` : `Dejaste de seguir a ${username}`,
        severity: 'success',
      });
    } catch (err) {
      showToast({ message: err?.response?.data?.error || 'No se pudo completar', severity: 'error' });
    } finally {
      setCargandoFollow(false);
    }
  };

  if (cargando) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  }

  if (error || !perfil) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Vendedor no encontrado</Typography>
        <Button component={RouterLink} to="/cards" variant="contained" sx={{ mt: 2 }}>Ver catálogo</Button>
      </Box>
    );
  }

  const esPropio = perfil.esPropio || (user && user.username === username);
  const stats = [
    { icon: <SellIcon color="primary" />, valor: perfil.ventas ?? 0, label: 'Ventas realizadas' },
    { icon: <PositiveIcon color="success" />, valor: `${perfil.pctPositivas ?? 0}%`, label: 'Reseñas positivas' },
    { icon: <ActiveIcon color="warning" />, valor: perfil.publicacionesActivas ?? 0, label: 'Publicaciones activas' },
  ];

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      {/* Encabezado */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <Avatar
            src={perfil.avatarUrl || undefined}
            sx={{ width: 88, height: 88, bgcolor: 'primary.light', fontSize: 36, fontWeight: 800 }}
          >
            {(perfil.nombre || perfil.username || '?').charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>{perfil.nombre || perfil.username}</Typography>
              <Chip size="small" icon={<StoreIcon />} label={`@${perfil.username}`} variant="outlined" />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexWrap: 'wrap', gap: 1 }}>
              <Rating value={Number(perfil.rating || 0)} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                {Number(perfil.rating || 0).toFixed(1)} · {perfil['reseñas'] ?? 0} reseña(s)
              </Typography>
              <Typography variant="body2" color="text.secondary">·</Typography>
              <Typography variant="body2" color="text.secondary">
                {perfil.followers ?? 0} seguidor(es) · {perfil.following ?? 0} siguiendo
              </Typography>
            </Stack>
            {perfil.bio && <Typography sx={{ mt: 1, color: 'text.secondary' }}>{perfil.bio}</Typography>}
          </Box>
          {!esPropio && (
            <Button
              variant={siguiendo ? 'outlined' : 'contained'}
              startIcon={siguiendo ? <UnfollowIcon /> : <FollowIcon />}
              onClick={toggleFollow}
              disabled={cargandoFollow}
            >
              {siguiendo ? 'Dejando de seguir' : 'Seguir'}
            </Button>
          )}
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        <Grid container spacing={2}>
          {stats.map((s) => (
            <Grid item xs={12} sm={4} key={s.label}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{
                  width: 44, height: 44, borderRadius: 2, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover',
                }}>
                  {s.icon}
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{s.valor}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 3, mb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab label={`Publicaciones (${listings.length})`} />
        <Tab label={`Reseñas (${reviews.length})`} />
      </Tabs>

      {tab === 0 && (
        listings.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700 }}>Sin publicaciones activas</Typography>
            <Typography variant="body2" color="text.secondary">Este vendedor no tiene cartas a la venta ahora.</Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {listings.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <CardCard card={card} />
              </Grid>
            ))}
          </Grid>
        )
      )}

      {tab === 1 && (
        reviews.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700 }}>Aún no hay reseñas</Typography>
            <Typography variant="body2" color="text.secondary">Las reseñas aparecerán cuando otros usuarios compren.</Typography>
          </Paper>
        ) : (
          <Stack spacing={1.5}>
            {reviews.map((r, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>
                    {(r.autor?.nombre || r.autor?.username || '?').charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontWeight: 700 }}>{r.autor?.nombre || r.autor?.username || 'Usuario'}</Typography>
                      <Rating value={r.rating || 0} size="small" readOnly />
                      <Chip
                        size="small"
                        label={ESTRELLAS[(r.rating || 1) - 1]}
                        color={(r.rating || 0) >= 4 ? 'success' : (r.rating || 0) >= 3 ? 'warning' : 'error'}
                        variant="outlined"
                      />
                    </Stack>
                    {r.fecha && (
                      <Typography variant="caption" color="text.secondary">
                        {new Date(r.fecha).toLocaleDateString('es')}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                {r.comment && (
                  <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>{r.comment}</Typography>
                )}
              </Paper>
            ))}
          </Stack>
        )
      )}

      {anchoMovil && <Box sx={{ height: 24 }} />}
    </Box>
  );
};
