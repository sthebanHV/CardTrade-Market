import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useStore } from '../../store';
import { usersAPI } from '../../api/apiClient';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setUser } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      try {
        const profile = await usersAPI.getProfile(username);
        setUser(profile);
      } catch {
        setUser({ username });
      }
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data === 'string' && data ? data : 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Iniciar Sesión</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </Typography>
    </Box>
  );
};
