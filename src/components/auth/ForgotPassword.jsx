import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { authAPI } from '../../api/apiClient';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.forgotPassword(email);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <Paper elevation={0} variant="outlined" sx={{ maxWidth: 460, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography sx={{ fontSize: 48, textAlign: 'center' }}>📧</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center', mt: 1 }}>
          Revisa tu correo
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, textAlign: 'center' }}>
          {result.message}
        </Typography>
        {result.resetUrl && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Modo desarrollo: abre el enlace de restablecimiento:{' '}
            <a href={result.resetUrl} target="_blank" rel="noreferrer">{result.resetUrl}</a>
          </Alert>
        )}
        <Button component={Link} to="/login" variant="contained" sx={{ mt: 3 }} fullWidth>
          Volver al inicio de sesión
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} variant="outlined" sx={{ maxWidth: 440, mx: 'auto', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Recuperar contraseña</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Escribe el correo registrado y te enviaremos un enlace para crear una nueva contraseña.
        El enlace expira en 1 hora.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={submit}>
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          autoFocus
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <span style={{ marginRight: 8, display: 'flex' }}><EmailIcon fontSize="small" /></span>,
          }}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/login">Volver al inicio de sesión</Link>
      </Typography>
    </Paper>
  );
};
