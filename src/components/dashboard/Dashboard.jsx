import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Avatar, Stack, Grid,
  CircularProgress, Alert, Divider, Button,
} from '@mui/material';
import { useStore } from '../../store';
import { usersAPI } from '../../api/apiClient';

export const Dashboard = () => {
  const { user, token, cart } = useStore();
  const [dashData, setDashData] = useState(null);
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
    usersAPI
      .getDashboard(username)
      .then(setDashData)
      .catch(() => setError('No se pudo cargar tu información'))
      .finally(() => setLoading(false));
  }, [token, user?.username, navigate]);

  if (!token) return null;

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
  const profile = dashData || user || {};

  return (
    <Box sx={{ p: 2, maxWidth: 900 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>Dashboard</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && !dashData && <CircularProgress sx={{ mb: 2 }} />}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ width: 56, height: 56 }}>
              {(profile.nombre || profile.username || 'U').charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5">{profile.nombre || profile.username || 'Usuario'}</Typography>
              <Typography variant="body2" color="text.secondary">
                @{profile.username || ''} · {profile.email || ''}
              </Typography>
              {profile.fechaCreacion && (
                <Typography variant="body2" color="text.secondary">
                  Miembro desde: {new Date(profile.fechaCreacion).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">${total.toFixed(2)}</Typography>
            <Typography variant="body2" color="text.secondary">Total Carrito</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{cart.length}</Typography>
            <Typography variant="body2" color="text.secondary">Cartas en Carrito</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{profile.rating ?? '—'}</Typography>
            <Typography variant="body2" color="text.secondary">Rating</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{profile.role?.replace('ROLE_', '') || 'USER'}</Typography>
            <Typography variant="body2" color="text.secondary">Rol</Typography>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" component={Link} to="/">Ver cartas</Button>
        <Button variant="outlined" component={Link} to="/cart">Ir al carrito</Button>
      </Box>
    </Box>
  );
};
