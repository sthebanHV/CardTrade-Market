import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, IconButton, List, ListItem,
  ListItemText, ListItemIcon, CircularProgress, Alert, Divider,
} from '@mui/material';
import {
  Notifications as NotifIcon, DoneAll as ReadAllIcon, Circle as DotIcon,
  LocalShipping, Sell as SellIcon, NotificationsActive as PriceIcon,
  Info as InfoIcon, Chat as ChatIcon, Star as StarIcon, Delete as DeleteIcon,
} from '@mui/icons-material';
import { notificationsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const ICONOS = {
  LISTING_ADDED: <SellIcon color="primary" />,
  PRICE_DROP: <PriceIcon color="error" />,
  ORDER_UPDATE: <LocalShipping color="success" />,
  MESSAGE: <ChatIcon color="info" />,
  REVIEW: <StarIcon color="warning" />,
  SYSTEM: <InfoIcon color="action" />,
};

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const token = useStore((s) => s.token);
  const [notifs, setNotifs] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = () => {
    setCargando(true);
    notificationsAPI.list()
      .then(setNotifs)
      .catch(() => setError('No se pudieron cargar las notificaciones.'))
      .finally(() => setCargando(false));
  };
  useEffect(cargar, []);

  const abrir = async (n) => {
    if (!n.isRead) {
      try { await notificationsAPI.markRead(n.id); } catch { /* noop */ }
    }
    if (n.actionUrl) navigate(n.actionUrl);
    else cargar();
  };

  const marcarTodas = async () => {
    try {
      await notificationsAPI.markAllRead();
      cargar();
    } catch { /* noop */ }
  };

  if (!token) {
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', py: 4 }}>
        <Alert severity="info">Inicia sesión para ver tus notificaciones.</Alert>
        <Button variant="contained" component={Link} to="/login" sx={{ mt: 2 }}>Iniciar sesión</Button>
      </Box>
    );
  }

  const noLeidas = notifs.filter((n) => !n.isRead).length;

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Notificaciones</Typography>
          <Typography variant="body2" color="text.secondary">
            {noLeidas > 0 ? `${noLeidas} sin leer` : 'Todo al día'} (US-45)
          </Typography>
        </Box>
        <Button startIcon={<ReadAllIcon />} onClick={marcarTodas} disabled={noLeidas === 0}>
          Marcar todas como leídas
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {cargando ? (
        <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
      ) : notifs.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <NotifIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>No tienes notificaciones</Typography>
          <Typography variant="body2" color="text.secondary">
            Aparecerán aquí ventas, alertas de precio y novedades de vendedores que sigues.
          </Typography>
        </Paper>
      ) : (
        <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <List disablePadding>
            {notifs.map((n, idx) => (
              <Box key={n.id}>
                <ListItem
                  button
                  onClick={() => abrir(n)}
                  sx={{
                    bgcolor: n.isRead ? 'transparent' : 'action.hover',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    {ICONOS[n.type] || <InfoIcon color="action" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: n.isRead ? 500 : 800 }}>
                          {n.title}
                        </Typography>
                        {!n.isRead && <DotIcon sx={{ fontSize: 8, color: 'primary.main' }} />}
                      </Stack>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">{n.message}</Typography>
                        <Typography variant="caption" color="text.disabled">
                          {n.createdAt ? new Date(n.createdAt).toLocaleString('es-MX') : ''}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {idx < notifs.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};
