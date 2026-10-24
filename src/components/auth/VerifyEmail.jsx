import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import { authAPI } from '../../api/apiClient';

export const VerifyEmail = () => {
  const { token } = useParams();
  const [state, setState] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let activo = true;
    authAPI
      .confirmVerifyEmail(token)
      .then((res) => {
        if (!activo) return;
        setState('ok');
        setMessage(res.message);
      })
      .catch((err) => {
        if (!activo) return;
        setState('error');
        setMessage(err.response?.data?.error || 'El enlace de verificación no es válido o expiró');
      });
    return () => { activo = false; };
  }, [token]);

  return (
    <Paper elevation={0} variant="outlined" sx={{ maxWidth: 460, mx: 'auto', p: 4, borderRadius: 3, textAlign: 'center' }}>
      {state === 'loading' && (
        <>
          <CircularProgress sx={{ my: 3 }} />
          <Typography>Verificando tu correo…</Typography>
        </>
      )}
      {state === 'ok' && (
        <>
          <Typography sx={{ fontSize: 52 }}>🎉</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>¡Cuenta activada!</Typography>
          <Alert severity="success" sx={{ mt: 2, textAlign: 'left' }}>{message}</Alert>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }} fullWidth>
            Empezar a explorar
          </Button>
        </>
      )}
      {state === 'error' && (
        <>
          <Typography sx={{ fontSize: 52 }}>⚠️</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>No se pudo verificar</Typography>
          <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert>
          <Button component={Link} to="/login" variant="outlined" sx={{ mt: 3 }} fullWidth>
            Ir al inicio de sesión
          </Button>
        </>
      )}
    </Paper>
  );
};
