import { Box, Typography, Paper, List, ListItemButton, ListItemIcon, ListItemText, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Lock as LockIcon, Security as ShieldIcon, Notifications as NotifIcon,
  Palette as ThemeIcon, Verified as VerifiedIcon, Email as EmailIcon,
  Home as HomeIcon, CreditCard as CardIcon,
} from '@mui/icons-material';
import { useStore } from '../../store';
import { authAPI } from '../../api/apiClient';
import { useState } from 'react';

export const SettingsPage = () => {
  const user = useStore((s) => s.user);
  const refreshUser = useStore((s) => s.refreshUser);
  const [resending, setResending] = useState(false);

  const reenviar = async () => {
    setResending(true);
    try {
      const res = await authAPI.verifyEmail();
      alert(res.message + (res.verifyUrl ? `\n\nModo desarrollo: ${res.verifyUrl}` : ''));
    } catch (err) {
      alert(err.response?.data?.error || 'No se pudo reenviar');
    } finally {
      setResending(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Configuración</Typography>

      {!user?.emailVerified && (
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, mb: 3, bgcolor: 'warning.light', border: '1px solid', borderColor: 'warning.main' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon color="warning" />
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
              Tu correo no está verificado. Revisa tu bandeja o reenvía el enlace.
            </Typography>
            <Chip
              label={resending ? 'Enviando…' : 'Reenviar verificación'}
              color="warning"
              onClick={reenviar}
              clickable
              disabled={resending}
              size="small"
            />
          </Stack>
        </Paper>
      )}

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <List disablePadding>
          <ListItemButton component={Link} to="/settings/change-password" divider>
            <ListItemIcon><LockIcon /></ListItemIcon>
            <ListItemText
              primary="Cambiar contraseña"
              secondary="Solicita la contraseña actual y cierra la sesión tras el cambio"
            />
          </ListItemButton>
          <ListItemButton component={Link} to="/settings/security" divider>
            <ListItemIcon><ShieldIcon /></ListItemIcon>
            <ListItemText
              primary="Autenticación de dos factores"
              secondary={user?.tfaEnabled ? 'Activa (2FA)' : 'Añade una capa extra de seguridad'}
            />
            <Chip size="small" label={user?.tfaEnabled ? 'Activa' : 'Inactiva'} color={user?.tfaEnabled ? 'success' : 'default'} />
          </ListItemButton>
          <ListItemButton component={Link} to="/profile" divider>
            <ListItemIcon><ThemeIcon /></ListItemIcon>
            <ListItemText
              primary="Editar perfil"
              secondary="Nombre, usuario, correo, biografía y foto"
            />
          </ListItemButton>
          <ListItemButton component={Link} to="/settings/addresses" divider>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText
              primary="Direcciones de envío"
              secondary="Guarda hasta 5 direcciones (US-26)"
            />
          </ListItemButton>
          <ListItemButton component={Link} to="/settings/payment" divider>
            <ListItemIcon><CardIcon /></ListItemIcon>
            <ListItemText
              primary="Métodos de pago"
              secondary="Tarjetas guardadas — sin CVV (US-27)"
            />
          </ListItemButton>
          <ListItemButton component={Link} to="/notifications">
            <ListItemIcon><NotifIcon /></ListItemIcon>
            <ListItemText
              primary="Notificaciones"
              secondary="Centro de notificaciones (US-45)"
            />
          </ListItemButton>
        </List>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, mt: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <VerifiedIcon color={user?.emailVerified ? 'success' : 'disabled'} />
          <Typography variant="subtitle2">
            Correo: {user?.email} {user?.emailVerified ? '· verificado ✓' : '· sin verificar'}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          Último cambio de contraseña:{' '}
          {user?.fechaUltimoCambioPassword ? new Date(user.fechaUltimoCambioPassword).toLocaleString('es') : 'nunca'}
        </Typography>
      </Paper>
    </Box>
  );
};
