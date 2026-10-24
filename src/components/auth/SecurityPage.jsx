import { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Alert, Paper, Divider, Stack, Chip, TextField,
  List, ListItem, ListItemText, CircularProgress, IconButton, Tooltip,
} from '@mui/material';
import { QrCode2 as QrIcon, ContentCopy as CopyIcon, Download as DownloadIcon, Shield as ShieldIcon } from '@mui/icons-material';
import { authAPI } from '../../api/apiClient';
import { useStore } from '../../store';

export const SecurityPage = () => {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);
  const refreshUser = useStore((s) => s.refreshUser);

  const [setup, setSetup] = useState(null);
  const [code, setCode] = useState('');
  const [backupCodes, setBackupCodes] = useState(null);
  const [disablePwd, setDisablePwd] = useState('');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { refreshUser(); /* eslint-disable-next-line */ }, []);

  const activar = async () => {
    setMsg(null);
    setBusy(true);
    try {
      const res = await authAPI.enable2fa();
      setSetup(res);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'No se pudo iniciar la configuración' });
    } finally {
      setBusy(false);
    }
  };

  const confirmar = async (e) => {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      const res = await authAPI.verify2fa(code);
      setBackupCodes(res.backupCodes || []);
      setSetup(null);
      setCode('');
      await refreshUser();
      setMsg({ type: 'success', text: '2FA activado correctamente. Guarda tus códigos de respaldo.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Código inválido' });
    } finally {
      setBusy(false);
    }
  };

  const cargarCodes = async () => {
    try {
      const res = await authAPI.backupCodes();
      setBackupCodes(res.backupCodes || []);
    } catch {
      setBackupCodes([]);
    }
  };

  const desactivar = async (e) => {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      await authAPI.disable2fa(disablePwd);
      setDisablePwd('');
      await refreshUser();
      setBackupCodes(null);
      setMsg({ type: 'success', text: '2FA desactivado' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'No se pudo desactivar 2FA' });
    } finally {
      setBusy(false);
    }
  };

  const copiarCodes = async () => {
    try {
      await navigator.clipboard.writeText((backupCodes || []).join('\n'));
      setMsg({ type: 'success', text: 'Códigos copiados al portapapeles' });
    } catch {
      setMsg({ type: 'error', text: 'No se pudieron copiar' });
    }
  };

  const descargarCodes = () => {
    const blob = new Blob(
      [`Códigos de respaldo CardTrade Market (${user?.username})\n\n`, ...(backupCodes || []).join('\n')],
      { type: 'text/plain' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cardtrade-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Autenticación de dos factores</Typography>

      {msg && <Alert severity={msg.type} sx={{ mb: 2 }} onClose={() => setMsg(null)}>{msg.text}</Alert>}

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <ShieldIcon color={user?.tfaEnabled ? 'success' : 'action'} />
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700 }}>Estado</Typography>
          <Chip
            size="small"
            label={user?.tfaEnabled ? '2FA activo' : '2FA inactivo'}
            color={user?.tfaEnabled ? 'success' : 'default'}
          />
        </Stack>

        {!user?.tfaEnabled && !setup && (
          <>
            <Typography color="text.secondary" sx={{ mt: 1.5 }}>
              Protege tu cuenta con una capa adicional: además de tu contraseña, ingresarás un código
              de 6 dígitos de tu app de autenticación (Google Authenticator, Authy, etc.).
            </Typography>
            <Button variant="contained" startIcon={<QrIcon />} onClick={activar} disabled={busy} sx={{ mt: 2 }}>
              {busy ? 'Generando…' : 'Activar 2FA'}
            </Button>
          </>
        )}

        {setup && (
          <>
            <Divider sx={{ my: 2.5 }} />
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>1. Escanea el código QR</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              O ingresa el código manualmente en tu app de autenticación.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'flex-start' }}>
              <Box
                component="img"
                src={setup.qrUrl}
                alt="Código QR de 2FA"
                sx={{ width: 200, height: 200, border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1, bgcolor: '#fff' }}
              />
              <Box>
                <Typography variant="caption" color="text.secondary">Código manual</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 16, letterSpacing: 1.5, wordBreak: 'break-all' }}>
                    {setup.secret}
                  </Typography>
                  <Tooltip title="Copiar código">
                    <IconButton
                      size="small"
                      onClick={() => navigator.clipboard?.writeText(setup.secret)}
                      aria-label="Copiar secreto"
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </Stack>

            <Typography sx={{ fontWeight: 700, mt: 2.5, mb: 1 }}>2. Ingresa el código de 6 dígitos</Typography>
            <Box component="form" onSubmit={confirmar}>
              <TextField
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                inputProps={{ inputMode: 'numeric', maxLength: 6, 'aria-label': 'Código de 6 dígitos' }}
                sx={{ width: 180, '& input': { textAlign: 'center', fontSize: 26, letterSpacing: 8 } }}
              />
              <Button type="submit" variant="contained" sx={{ ml: 1.5 }} disabled={busy || code.length !== 6}>
                {busy ? 'Verificando…' : 'Activar 2FA'}
              </Button>
              <Button color="inherit" sx={{ ml: 1 }} onClick={() => setSetup(null)}>Cancelar</Button>
            </Box>
          </>
        )}

        {user?.tfaEnabled && !setup && (
          <>
            <Divider sx={{ my: 2.5 }} />
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Desactivar 2FA</Typography>
            <Box component="form" onSubmit={desactivar}>
              <Stack direction="row" spacing={1.5}>
                <TextField
                  label="Contraseña actual"
                  type="password"
                  value={disablePwd}
                  onChange={(e) => setDisablePwd(e.target.value)}
                  size="small"
                  required
                />
                <Button type="submit" variant="outlined" color="error" disabled={busy || !disablePwd}>
                  Desactivar
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Paper>

      {user?.tfaEnabled && (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}>
            Códigos de respaldo
          </Typography>
          {!backupCodes ? (
            <Button variant="outlined" onClick={cargarCodes}>Ver códigos de respaldo</Button>
          ) : backupCodes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No quedan códigos de respaldo. Desactiva y activa 2FA de nuevo para generar nuevos.
            </Typography>
          ) : (
            <>
              <Alert severity="warning" sx={{ mb: 1.5 }}>
                Guarda estos códigos en un lugar seguro. Cada código solo se puede usar una vez.
              </Alert>
              <List dense sx={{ bgcolor: 'background.default', borderRadius: 2, py: 0.5 }}>
                {backupCodes.map((c) => (
                  <ListItem key={c} sx={{ py: 0.25 }}>
                    <ListItemText
                      primary={c}
                      primaryTypographyProps={{ sx: { fontFamily: 'monospace', letterSpacing: 1 } }}
                    />
                  </ListItem>
                ))}
              </List>
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <Button startIcon={<DownloadIcon />} onClick={descargarCodes} size="small" variant="outlined">
                  Descargar
                </Button>
                <Button startIcon={<CopyIcon />} onClick={copiarCodes} size="small" variant="outlined">
                  Copiar todos
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};
