import { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, TextField, Button, Alert, Paper, Divider, Stack, Chip,
  Avatar, IconButton, List, ListItem, ListItemText, CircularProgress, Badge,
} from '@mui/material';
import { PhotoCamera as AvatarIcon, Verified as VerifiedIcon, History as HistoryIcon, Star as StarIcon, Collections as CollectionIcon, Storefront as StoreIcon } from '@mui/icons-material';
import { usersAPI, dashboardAPI } from '../../api/apiClient';
import { useStore } from '../../store';

export const ProfilePage = () => {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);
  const refreshUser = useStore((s) => s.refreshUser);
  const fileRef = useRef(null);

  const [form, setForm] = useState({ nombre: '', username: '', email: '', bio: '' });
  const [changes, setChanges] = useState([]);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    dashboardAPI.stats().then(setStats).catch(() => setStats(null));
  }, []);

  useEffect(() => {
    let activo = true;
    Promise.all([
      usersAPI.getMyProfile().catch(() => null),
      usersAPI.getChanges().catch(() => []),
    ]).then(([profile, hist]) => {
      if (!activo) return;
      if (profile) {
        setUser(profile);
        setForm({
          nombre: profile.nombre || '',
          username: profile.username || '',
          email: profile.email || '',
          bio: profile.bio || '',
        });
      }
      setChanges(hist || []);
      setLoading(false);
    });
    return () => { activo = false; };
  }, [setUser]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const updated = await usersAPI.updateProfile({
        nombre: form.nombre,
        username: form.username,
        email: form.email,
        bio: form.bio,
      });
      setUser(updated);
      setMsg({ type: 'success', text: 'Perfil actualizado correctamente' });
      const hist = await usersAPI.getChanges().catch(() => []);
      setChanges(hist || []);
      if (updated.pendingEmail) {
        setMsg({
          type: 'info',
          text: `Se envió un código de verificación a ${updated.pendingEmail}. Confirma el nuevo correo para completar el cambio.`,
        });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'No se pudo guardar' });
    } finally {
      setSaving(false);
    }
  };

  const subirAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpe?g)$/.test(file.type)) {
      setMsg({ type: 'error', text: 'Solo se permiten imágenes JPG o PNG' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ type: 'error', text: 'La imagen no debe superar los 5MB' });
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const updated = await usersAPI.uploadAvatar(reader.result);
          setUser(updated);
          setMsg({ type: 'success', text: 'Foto de perfil actualizada' });
        } catch (err) {
          setMsg({ type: 'error', text: err.response?.data?.error || 'No se pudo subir la foto' });
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Mi perfil</Typography>

      {msg && <Alert severity={msg.type} sx={{ mb: 2 }} onClose={() => setMsg(null)}>{msg.text}</Alert>}

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                size="small"
                onClick={() => fileRef.current?.click()}
                sx={{ bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}
                aria-label="Cambiar foto"
              >
                {uploading ? <CircularProgress size={16} color="inherit" /> : <AvatarIcon sx={{ fontSize: 15 }} />}
              </IconButton>
            }
          >
            <Avatar
              src={user?.avatarUrl || undefined}
              sx={{ width: 92, height: 92, bgcolor: 'primary.light', fontSize: 38, fontWeight: 700 }}
            >
              {(form.username || 'U').charAt(0).toUpperCase()}
            </Avatar>
          </Badge>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg" hidden onChange={subirAvatar} />
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>{form.username}</Typography>
              <Chip
                size="small"
                label={user?.role === 'ROLE_ADMIN' ? 'Administrador' : 'Usuario'}
                color={user?.role === 'ROLE_ADMIN' ? 'error' : 'primary'}
              />
              {user?.emailVerified ? (
                <Chip size="small" color="success" icon={<VerifiedIcon sx={{ fontSize: 15 }} />} label="Correo verificado" />
              ) : (
                <Chip size="small" color="warning" label="Correo sin verificar" />
              )}
              {user?.tfaEnabled && <Chip size="small" color="success" variant="outlined" label="2FA activo" />}
          {stats?.perspectivas?.VENDEDOR_VERIFICADO && (
            <Chip size="small" color="success" icon={<StarIcon sx={{ fontSize: 15 }} />}
              label={`Vendedor verificado · ${stats.ratingPromedio || '—'} ★`} />
          )}
          {stats?.perspectivas?.VENDEDOR && !stats?.perspectivas?.VENDEDOR_VERIFICADO && (
            <Chip size="small" color="info" variant="outlined" icon={<StoreIcon sx={{ fontSize: 15 }} />} label="Vendedor" />
          )}
          {stats?.perspectivas?.COLECCIONISTA && (
            <Chip size="small" color="secondary" variant="outlined" icon={<CollectionIcon sx={{ fontSize: 15 }} />}
              label={`Coleccionista · ${stats.itemsColeccion} cartas`} />
          )}
          {stats?.perspectivas?.COMPRADOR && (
            <Chip size="small" variant="outlined" label={`Comprador · ${stats.comprasTotal} órden(es)`} />
          )}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Miembro desde {user?.fechaCreacion ? new Date(user.fechaCreacion).toLocaleDateString('es') : '—'}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box component="form" onSubmit={guardar}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Nombre completo" value={form.nombre} onChange={set('nombre')} fullWidth />
            <TextField
              label="Nombre de usuario"
              value={form.username}
              onChange={set('username')}
              fullWidth
              helperText="Debe ser único en la plataforma"
            />
          </Stack>
          <TextField
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={set('email')}
            fullWidth
            sx={{ mt: 2 }}
            helperText={user?.pendingEmail ? `Pendiente de verificar: ${user.pendingEmail}` : 'Cambiar el correo requiere verificación'}
          />
          <TextField
            label="Biografía"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value.slice(0, 200) })}
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
            helperText={`${form.bio.length}/200 caracteres`}
            inputProps={{ maxLength: 200, 'aria-label': 'Biografía' }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2.5 }} disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </Button>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <HistoryIcon color="action" />
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700 }}>Cambios recientes</Typography>
        </Stack>
        {changes.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Todavía no has modificado tu perfil.</Typography>
        ) : (
          <List dense disablePadding>
            {changes.map((c) => (
              <ListItem key={c.id} divider sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <b>{c.campo}</b>: {c.valorAnterior || '(vacío)'} → {c.valorNuevo || '(vacío)'}
                    </Typography>
                  }
                  secondary={c.fecha ? new Date(c.fecha).toLocaleString('es') : ''}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};
