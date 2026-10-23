import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Avatar, Stack, CircularProgress } from '@mui/material';
import { useStore } from '../../store';

export const Dashboard = () => {
  const { user, cart } = useStore();
  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <Box sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {user && (
        <Box sx={{ mb: 4 }}>
          <Card sx={{ width: '100%', maxWidth: 500 }}>
            <CardContent>
              <Stack direction="horizontal" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 50, height: 50 }} component="span">
                  {user.nombre ? user.nombre.charAt(0) + user.apellido.charAt(0) : 'U'}
                </Avatar>
                <Stack direction="vertical">
                  <Typography variant="h5">{user.nombre || 'Usuario'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email || ''}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* KPIs */}
      <Box sx={{ mt: 4, display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            ${total.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Carrito
          </Typography>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {cart.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cartas en Carrito
          </Typography>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {user ? user.rating || 0 : 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating
          </Typography>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {user ? user.collection?.length || 0 : 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cartas en Colección
          </Typography>
        </Card>
      </Box>

      {/* Estadísticas recientes */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Actividad Reciente</Typography>
        <CircularProgress sx={{ width: 40, height: 40 }} />
        <Typography variant="body2" color="text.secondary">
            ¡Volver pronto!
        </Typography>
      </Box>
    </Box>
  );
};