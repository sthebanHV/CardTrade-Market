import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Avatar, Chip, CircularProgress, Alert,
} from '@mui/material';
import { PersonAdd as FollowIcon } from '@mui/icons-material';
import { sellersAPI } from '../../api/apiClient';

export const MyFollowedPage = () => {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    sellersAPI.followed()
      .then(setLista)
      .catch(() => setError('No se pudieron cargar los vendedores que sigues.'))
      .finally(() => setCargando(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Vendedores que sigo</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Recibe novedades de sus publicaciones (US-36)
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {cargando ? (
        <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
      ) : lista.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <FollowIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>No sigues a ningún vendedor</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Visita perfiles de vendedores y pulsa “Seguir” para estar al tanto.
          </Typography>
          <Button variant="contained" component={Link} to="/cards">Explorar catálogo</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {lista.map((v) => (
            <Paper key={v.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Avatar src={v.avatarUrl || undefined} sx={{ width: 52, height: 52 }}>
                  {(v.nombre || v.username || '?').charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 700 }}>{v.nombre || v.username}</Typography>
                    <Chip label={`@${v.username}`} size="small" variant="outlined" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {v.bio || 'Sin biografía'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {v.followers} seguidor{v.followers !== 1 ? 'es' : ''} ·{' '}
                    {v.publicacionesActivas} publicación{v.publicacionesActivas !== 1 ? 'es' : ''} activa{v.publicacionesActivas !== 1 ? 's' : ''}
                    {v.desde ? ` · Siguiendo desde ${new Date(v.desde).toLocaleDateString('es-MX')}` : ''}
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  <Button variant="outlined" size="small" component={Link} to={`/seller/${v.username}`}>
                    Ver perfil
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};
