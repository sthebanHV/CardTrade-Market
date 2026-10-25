import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Avatar, Stack, Grid,
  CircularProgress, Alert, Button, Chip, List, ListItem, ListItemIcon,
  ListItemText, Paper,
} from '@mui/material';
import {
  ShoppingBasket as SalesIcon, ShoppingCart as BuyIcon,
  Collections as CollectionIcon, Favorite as FavIcon,
  Notifications as NotifIcon, People as FollowIcon,
  Storefront as ListingIcon, Speed as SpeedIcon,
  LocalShipping as ShippingIcon, Star as StarIcon,
  Campaign as AlertIcon, Reviews as ReviewIcon,
  TrendingUp as TrendIcon,
} from '@mui/icons-material';
import { useStore } from '../../store';
import { usersAPI, dashboardAPI } from '../../api/apiClient';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const hora = (iso) => (iso ? new Date(iso).toLocaleString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '');

const iconoActividad = {
  COMPRA: <BuyIcon fontSize="small" color="primary" />,
  VENTA: <SalesIcon fontSize="small" color="success" />,
  'RESEÑA': <ReviewIcon fontSize="small" color="warning" />,
  SEGUIDOR: <FollowIcon fontSize="small" color="info" />,
};

export const Dashboard = () => {
  const { user, token, cart } = useStore();
  const [stats, setStats] = useState(null);
  const [actividad, setActividad] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const username = user?.username;
    if (!username) return;
    Promise.all([
      dashboardAPI.stats(),
      dashboardAPI.activity().catch(() => []),
      usersAPI.getDashboard(username).catch(() => null),
    ])
      .then(([s, a, p]) => {
        setStats(s);
        setActividad(a || []);
        setPerfil(p);
      })
      .catch(() => setError('No se pudo cargar tu dashboard'))
      .finally(() => setLoading(false));
  }, [token, user?.username, navigate]);

  if (!token) return null;

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
  const perspectivas = stats?.perspectivas || {};

  const tarjetas = [
    { icon: <SalesIcon />, label: 'Ventas del mes', value: `${stats?.ventasMes?.cantidad ?? 0}`, sub: fmt(stats?.ventasMes?.monto), color: 'success.main' },
    { icon: <BuyIcon />, label: 'Compras del mes', value: `${stats?.comprasMes?.cantidad ?? 0}`, sub: fmt(stats?.comprasMes?.monto), color: 'primary.main' },
    { icon: <ListingIcon />, label: 'Publicaciones activas', value: `${stats?.publicacionesActivas ?? 0}`, sub: null, color: 'info.main' },
    { icon: <FavIcon />, label: 'Favoritos', value: `${stats?.favoritos ?? 0}`, sub: null, color: 'error.main' },
    { icon: <NotifIcon />, label: 'Sin leer', value: `${(stats?.mensajesSinLeer ?? 0) + 0}`, sub: 'mensajes', color: 'warning.main' },
    { icon: <CollectionIcon />, label: 'Mi colección', value: `${stats?.itemsColeccion ?? 0}`, sub: fmt(stats?.valorColeccion), color: 'secondary.main' },
  ];

  const accesos = [
    { to: '/sell/new', text: 'Publicar carta', icon: <ListingIcon fontSize="small" /> },
    { to: '/my-purchases', text: 'Mis compras', icon: <BuyIcon fontSize="small" /> },
    { to: '/my-sales', text: 'Mis ventas', icon: <SalesIcon fontSize="small" /> },
    { to: '/my-collection', text: 'Mi colección', icon: <CollectionIcon fontSize="small" /> },
    { to: '/my-alerts', text: 'Alertas de precio', icon: <AlertIcon fontSize="small" /> },
    { to: '/notifications', text: 'Notificaciones', icon: <NotifIcon fontSize="small" /> },
    { to: '/messages', text: 'Mensajes', icon: <FollowIcon fontSize="small" /> },
    { to: '/cart', text: `Carrito (${fmt(total)})`, icon: <ShippingIcon fontSize="small" /> },
  ];

  return (
    <Box sx={{ p: 2, maxWidth: 1100, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Hola, {user?.nombre || user?.username}</Typography>
          <Typography variant="body2" color="text.secondary">Resumen de tu actividad · US-44</Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {perspectivas.VENDEDOR_VERIFICADO && <Chip icon={<StarIcon />} label="Vendedor verificado" color="success" size="small" />}
          {perspectivas.COLECCIONISTA && <Chip icon={<CollectionIcon />} label="Coleccionista" color="secondary" size="small" variant="outlined" />}
          {perspectivas.COMPRADOR && <Chip icon={<BuyIcon />} label="Comprador" color="primary" size="small" variant="outlined" />}
          {user?.role === 'ROLE_ADMIN' && <Chip label="Administrador" color="warning" size="small" />}
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && !stats && <CircularProgress sx={{ mb: 2 }} />}

      {stats && (
        <>
          <Grid container spacing={2}>
            {tarjetas.map((t) => (
              <Grid item xs={6} sm={4} md={2} key={t.label}>
                <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                  <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ color: t.color }}>{t.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>{t.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{t.label}</Typography>
                    {t.sub && <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{t.sub}</Typography>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <StarIcon fontSize="small" color="warning" />
                    <Typography variant="subtitle2">Tu perfil</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 52, height: 52 }}>
                      {(user?.nombre || user?.username || 'U').charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{user?.nombre || user?.username}</Typography>
                      <Typography variant="caption" color="text.secondary">@{user?.username} · {user?.email}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>{stats.ratingPromedio || '—'}</Typography>
                      <Typography variant="caption" color="text.secondary">Rating ({stats['reseñas']?.recibidas ?? 0})</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>{stats.ventasTotal}</Typography>
                      <Typography variant="caption" color="text.secondary">Ventas totales</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>{fmt(stats.ventasTotalMonto)}</Typography>
                      <Typography variant="caption" color="text.secondary">Ingresado</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <SpeedIcon fontSize="small" color="primary" />
                    <Typography variant="subtitle2">Accesos rápidos</Typography>
                  </Stack>
                  <List dense disablePadding>
                    {accesos.map((a) => (
                      <ListItem key={a.to} disableGutters
                        secondaryAction={<Button size="small" component={Link} to={a.to}>Ir</Button>}>
                        <ListItemIcon sx={{ minWidth: 36 }}>{a.icon}</ListItemIcon>
                        <ListItemText primary={a.text} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <TrendIcon fontSize="small" color="success" />
                    <Typography variant="subtitle2">Red</Typography>
                  </Stack>
                  <Grid container spacing={1}>
                    {[
                      { label: 'Seguidores', value: stats.seguidores, to: '/my-followed' },
                      { label: 'Seguidos', value: stats.seguidos, to: '/my-followed' },
                      { label: 'Alertas', value: stats.alertasPrecio, to: '/my-alerts' },
                      { label: 'Compras', value: stats.comprasTotal, to: '/my-purchases' },
                    ].map((x) => (
                      <Grid item xs={6} key={x.label}>
                        <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 2, textAlign: 'center', textDecoration: 'none', color: 'inherit', display: 'block' }}
                          component={Link} to={x.to}>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>{x.value}</Typography>
                          <Typography variant="caption" color="text.secondary">{x.label}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card variant="outlined" sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <NotifIcon fontSize="small" color="info" />
                <Typography variant="subtitle2">Actividad reciente</Typography>
              </Stack>
              {actividad.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Todavía no hay actividad. ¡Publica tu primera carta o compra algo!
                </Typography>
              ) : (
                <List dense disablePadding>
                  {actividad.map((ev, i) => (
                    <ListItem key={i} disableGutters divider
                      secondaryAction={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="caption" color="text.secondary">{hora(ev.fecha)}</Typography>
                          {ev.url && <Button size="small" component={Link} to={ev.url}>Ver</Button>}
                        </Stack>
                      }>
                      <ListItemIcon sx={{ minWidth: 40 }}>{iconoActividad[ev.tipo] || <NotifIcon fontSize="small" />}</ListItemIcon>
                      <ListItemText primary={ev.texto} primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};
