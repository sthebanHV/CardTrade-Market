import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useStore } from '../../store';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const register = useStore((s) => s.register);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ nombre, email, username, password });
      navigate('/login');
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data === 'string' && data ? data : 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Registrarse</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </Typography>
    </Box>
  );
};
