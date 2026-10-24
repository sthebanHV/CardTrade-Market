import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { authAPI } from '../../api/apiClient';
import { useStore } from '../../store';
import { passwordError } from './SocialButtons';

export const ChangePassword = () => {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const logout = useStore((s) => s.logout);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const pwdErr = passwordError(form.next);
    if (pwdErr) return setError(pwdErr);
    if (form.next !== form.confirm) return setError('Las contraseñas nuevas no coinciden');
    setLoading(true);
    try {
      const res = await authAPI.changePassword(form.current, form.next);
      setSuccess(res.message || 'Contraseña actualizada');
      setTimeout(() => {
        logout();
        navigate('/login', { replace: true });
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ maxWidth: 460, mx: 'auto', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Cambiar contraseña</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Solicitamos tu contraseña actual por seguridad. Tras el cambio cerraremos tu sesión.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={submit}>
        <TextField
          label="Contraseña actual"
          type={show ? 'text' : 'password'}
          value={form.current}
          onChange={set('current')}
          fullWidth
          required
          autoFocus
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
          }}
        />
        <TextField
          label="Nueva contraseña"
          type={show ? 'text' : 'password'}
          value={form.next}
          onChange={set('next')}
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
          label="Confirmar nueva contraseña"
          type={show ? 'text' : 'password'}
          value={form.confirm}
          onChange={set('confirm')}
          fullWidth
          required
          sx={{ mt: 2, mb: 2.5 }}
          error={!!form.confirm && form.confirm !== form.next}
          helperText={form.confirm && form.confirm !== form.next ? 'Las contraseñas no coinciden' : ''}
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading} size="large">
          {loading ? 'Guardando…' : 'Guardar cambios'}
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/settings">← Volver a configuración</Link>
      </Typography>
    </Paper>
  );
};
