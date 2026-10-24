import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Alert, Paper, Checkbox, FormControlLabel,
  InputAdornment, IconButton, Stack, Divider, CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Person as PersonIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useStore } from '../../store';
import { authAPI } from '../../api/apiClient';
import { SocialButtons, passwordError } from './SocialButtons';

export const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [resending, setResending] = useState(false);
  const register = useStore((s) => s.register);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.email) {
      setError('Completa todos los campos');
      return;
    }
    const pwdErr = passwordError(form.password);
    if (pwdErr) return setError(pwdErr);
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden');
    if (!terms) return setError('Debes aceptar la Política de Privacidad y los Términos de Uso');

    setLoading(true);
    try {
      const res = await register({
        nombre: form.username,
        email: form.email,
        username: form.username,
        password: form.password,
      });
      setSuccess({
        email: form.email,
        verifyToken: res.devVerifyToken,
        verifyUrl: res.verifyUrl,
      });
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data?.error === 'string' ? data.error : 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setResending(true);
    try {
      await authAPI.verifyEmail(success.email);
      alert('Correo de verificación reenviado (expira en 24 horas).');
    } catch {
      alert('No se pudo reenviar el correo');
    } finally {
      setResending(false);
    }
  };

  if (success) {
    return (
      <Paper elevation={0} variant="outlined" sx={{ maxWidth: 460, mx: 'auto', p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 52 }}>✅</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>¡Cuenta creada!</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Enviamos un correo de verificación a <b>{success.email}</b>.
          Revisa tu bandeja de entrada para activar tu cuenta.
        </Typography>
        <Alert severity="info" sx={{ mt: 2, textAlign: 'left' }}>
          Modo desarrollo: <b>verifica tu correo aquí</b> con este enlace:{' '}
          <a href={success.verifyUrl} target="_blank" rel="noreferrer">{success.verifyUrl}</a>
        </Alert>
        <Button variant="contained" onClick={resend} disabled={resending} sx={{ mt: 3 }} fullWidth>
          {resending ? 'Reenviando…' : 'Reenviar correo de verificación'}
        </Button>
        <Button component={Link} to="/" variant="text" sx={{ mt: 1 }} fullWidth>
          Ir a la página principal
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} variant="outlined" sx={{ maxWidth: 440, mx: 'auto', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Crear cuenta</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Únete a la comunidad de coleccionistas
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleRegister}>
        <TextField
          label="Nombre de usuario"
          value={form.username}
          onChange={set('username')}
          fullWidth
          required
          sx={{ mb: 2 }}
          inputProps={{ 'aria-label': 'Nombre de usuario' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>,
          }}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          value={form.email}
          onChange={set('email')}
          fullWidth
          required
          sx={{ mb: 2 }}
          inputProps={{ 'aria-label': 'Correo electrónico' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>,
          }}
        />
        <TextField
          label="Contraseña"
          type={show ? 'text' : 'password'}
          value={form.password}
          onChange={set('password')}
          fullWidth
          required
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
          label="Confirmar contraseña"
          type={show ? 'text' : 'password'}
          value={form.confirm}
          onChange={set('confirm')}
          fullWidth
          required
          sx={{ mb: 1.5 }}
          error={!!form.confirm && form.confirm !== form.password}
          helperText={form.confirm && form.confirm !== form.password ? 'Las contraseñas no coinciden' : ''}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
          }}
        />

        <FormControlLabel
          control={<Checkbox checked={terms} onChange={(e) => setTerms(e.target.checked)} size="small" />}
          label={
            <Typography variant="body2">
              Acepto la <Link to="#">Política de Privacidad</Link> y los <Link to="#">Términos de Uso</Link>
            </Typography>
          }
          sx={{ mb: 1.5, alignItems: 'flex-start' }}
        />

        <Button type="submit" variant="contained" fullWidth disabled={loading} size="large">
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Crear cuenta'}
        </Button>
      </Box>

      <SocialButtons mode="register" />

      <Typography variant="body2" sx={{ mt: 2.5, textAlign: 'center' }}>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </Typography>
    </Paper>
  );
};
