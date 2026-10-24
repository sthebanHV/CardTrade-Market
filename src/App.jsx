import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Badge, Fab, Tooltip, Snackbar, Alert, Paper, Stack, Button, Typography } from '@mui/material';
import { CompareArrows as CompareIcon, MailOutline as MailIcon, Close as CloseIcon } from '@mui/icons-material';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useStore } from './store';
import { authAPI } from './api/apiClient';

export const App = () => {
  const compare = useStore((s) => s.compare);
  const toast = useStore((s) => s.toast);
  const hideToast = useStore((s) => s.hideToast);
  const user = useStore((s) => s.user);
  const token = useStore((s) => s.token);
  const location = useLocation();
  const enCompare = location.pathname === '/compare';
  const enVerificacion = location.pathname.startsWith('/verify-email');

  const reenviar = async () => {
    try {
      const res = await authAPI.verifyEmail();
      useStore.getState().showToast({
        message: res.verifyUrl ? `Correo reenviado. Modo desarrollo: ${res.verifyUrl}` : res.message,
        severity: 'info',
      });
    } catch (err) {
      useStore.getState().showToast({
        message: err.response?.data?.error || 'No se pudo reenviar el correo',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {token && user && user.emailVerified === false && !enVerificacion && (
        <Box sx={{ px: { xs: 1.5, md: 3 }, pt: 1.5 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 1.25, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5,
              bgcolor: 'warning.light', borderColor: 'warning.main', flexWrap: 'wrap',
            }}
          >
            <MailIcon color="warning" fontSize="small" />
            <Typography variant="body2" sx={{ flexGrow: 1, minWidth: 200 }}>
              Tu correo no está verificado. Revisa tu bandeja de entrada o reenvía el enlace.
            </Typography>
            <Button size="small" variant="contained" color="warning" onClick={reenviar}>
              Reenviar verificación
            </Button>
          </Paper>
        </Box>
      )}

      <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 4 } }}>
        <Outlet />
      </Box>
      <Footer />

      {compare.length > 0 && !enCompare && (
        <Tooltip title="Comparar cartas seleccionadas">
          <Fab
            component={RouterLink}
            to={`/compare?ids=${compare.map((c) => c.id).join(',')}`}
            color="primary"
            variant="extended"
            sx={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
              boxShadow: '0 8px 24px rgba(30,64,175,0.4)',
            }}
          >
            <CompareIcon sx={{ mr: 1 }} />
            Comparar ({compare.length})
          </Fab>
        </Tooltip>
      )}

      <Snackbar
        open={!!toast}
        autoHideDuration={6000}
        onClose={hideToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast?.severity || 'success'} variant="filled" onClose={hideToast} sx={{ width: '100%' }}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
