import { Button, Stack, Typography, Divider, Alert } from '@mui/material';

export const SocialButtons = ({ mode = 'login' }) => (
  <>
    <Divider sx={{ my: 2.5 }}>
      <Typography variant="caption" color="text.secondary">
        O {mode === 'login' ? 'inicia sesión' : 'regístrate'} con
      </Typography>
    </Divider>
    <Stack direction="row" spacing={1.5}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() =>
          alert('Autenticación con Google no está configurada.\n\nConfigura GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en el backend para habilitarla (US-02).')
        }
        sx={{ textTransform: 'none', color: 'text.primary', borderColor: 'divider' }}
      >
        <span style={{ marginRight: 8, fontWeight: 700, color: '#4285F4' }}>G</span> Google
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() =>
          alert('Autenticación con Facebook no está configurada.\n\nConfigura FACEBOOK_APP_ID y FACEBOOK_APP_SECRET en el backend para habilitarla (US-02).')
        }
        sx={{ textTransform: 'none', color: 'text.primary', borderColor: 'divider' }}
      >
        <span style={{ marginRight: 8, fontWeight: 700, color: '#1877F2' }}>f</span> Facebook
      </Button>
    </Stack>
  </>
);

export const passwordError = (pwd) => {
  if (!pwd) return 'La contraseña es obligatoria';
  if (pwd.length < 8) return 'Mínimo 8 caracteres';
  if (!/[A-Z]/.test(pwd)) return 'Debe incluir una mayúscula';
  if (!/\d/.test(pwd)) return 'Debe incluir un número';
  if (!/[^A-Za-z0-9]/.test(pwd)) return 'Debe incluir un carácter especial';
  return '';
};
