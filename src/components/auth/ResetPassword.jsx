import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { authAPI } from '../../api/apiClient';
import { passwordError } from './SocialButtons';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const pwdErr = passwordError(pwd);
    if (pwdErr) return setError(pwdErr);
    if (pwd !== confirm) return setError('Las contraseñas no coinciden');
    setLoading(true);
    try {
      await authAPI.resetPassword(token, pwd);
      setDone(true);
      setTimeout(() => navigate('/login', { replace: true }), 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Paper elevation={0} variant="outlined" sx={{ maxWidth: 440, mx: 'auto', p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 48 }}>🎉</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>¡Contraseña actualizada!</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Tu contraseña fue restablecida. Todas las sesiones anteriores deben iniciar de nuevo.
          Serás redirigido al inicio de sesión…
        </Typography>
        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2.5 }}>Ir a iniciar sesión</Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} variant="outlined" sx={{ maxWidth: 440, mx: 'auto', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Nueva contraseña</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Crea una contraseña segura para tu cuenta.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={submit}>
        <TextField
          label="Nueva contraseña"
          type={show ? 'text' : 'password'}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          fullWidth
          required
          autoFocus
          sx={{ mb: 0.5 }}
          helperText="Mínimo 8 caracteres, 1 mayúscula, 1 número, 1 carácter especial"
          FormHelperTextProps={{ sx: { fontSize: 11.5 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)} edge="end" aria-label="Mostrar contraseña" size="small">
                  {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirmar nueva contraseña"
          type={show ? 'text' : 'password'}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          fullWidth
          required
          sx={{ mt: 2, mb: 2 }}
          error={!!confirm && confirm !== pwd}
          helperText={confirm && confirm !== pwd ? 'Las contraseñas no coinciden' : ''}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? 'Guardando…' : 'Restablecer contraseña'}
        </Button>
      </Box>
    </Paper>
  );
};
