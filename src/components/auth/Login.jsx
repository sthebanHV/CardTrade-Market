import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Alert, Paper, InputAdornment, IconButton,
  Checkbox, FormControlLabel, Stack, CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useStore } from '../../store';
import { usersAPI } from '../../api/apiClient';
import { SocialButtons } from './SocialButtons';

export const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tfa, setTfa] = useState(null);
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, complete2fa, setUser } = useStore();

  const from = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!identifier || !password) {
      setError('Completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      const res = await login(identifier, password);
      if (res?.tfaRequired) {
        setTfa(res);
        setLoading(false);
        return;
      }
      const username = identifier.includes('@') ? null : identifier;
      try {
        const profile = username
          ? await usersAPI.getProfile(username)
          : await usersAPI.getMyProfile();
        setUser(profile);
      } catch {
        setUser({ username: identifier });
      }
      navigate(from, { replace: true });
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data?.error === 'string' ? data.error : 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handle2fa = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await complete2fa(code, tfa.tmpToken);
      try {
        const profile = await usersAPI.getMyProfile();
        setUser(profile);
      } catch { /* perfil opcional */ }
      navigate(from, { replace: true });
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data?.error === 'string' ? data.error : 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  if (tfa) {
    return (
      <Paper elevation={0} variant="outlined" sx={{ maxWidth: 420, mx: 'auto', p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Verificación en dos pasos</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Ingresa el código de 6 dígitos de tu app de autenticación.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handle2fa}>
          <TextField
            label="Código de verificación"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            fullWidth
            autoFocus
            inputProps={{ inputMode: 'numeric', maxLength: 6, 'aria-label': 'Código de 6 dígitos' }}
            sx={{ mb: 2, '& input': { textAlign: 'center', fontSize: 28, letterSpacing: 8 } }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading || code.length !== 6}>
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Verificar'}
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => { setTfa(null); setCode(''); setError(''); }}>
            Volver a iniciar sesión
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} variant="outlined" sx={{ maxWidth: 420, mx: 'auto', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Iniciar sesión</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Bienvenido de nuevo a CardTrade Market</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleLogin}>
        <TextField
          label="Correo electrónico o usuario"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          fullWidth
          required
          autoFocus
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>,
          }}
        />
        <TextField
          label="Contraseña"
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          sx={{ mb: 1 }}
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

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} size="small" />}
            label={<Typography variant="body2">Recordarme</Typography>}
          />
          <Typography variant="body2">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </Typography>
        </Stack>

        <Button type="submit" variant="contained" fullWidth disabled={loading} size="large">
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </Button>
      </Box>

      <SocialButtons mode="login" />

      <Typography variant="body2" sx={{ mt: 2.5, textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </Typography>
    </Paper>
  );
};
