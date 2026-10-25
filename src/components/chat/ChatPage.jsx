import { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Paper, Stack, Avatar, TextField, IconButton, List,
  ListItemButton, ListItemAvatar, ListItemText, Badge, Chip, Divider,
  CircularProgress, Button, InputAdornment,
} from '@mui/material';
import { Send as SendIcon, Chat as ChatIcon, OpenInNew as OpenIcon } from '@mui/icons-material';
import { chatAPI } from '../../api/apiClient';
import { useStore } from '../../store';

const hora = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export const ChatPage = () => {
  const user = useStore((s) => s.user);
  const refreshUnread = useStore((s) => s.refreshUnread);
  const [convs, setConvs] = useState([]);
  const [activa, setActiva] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef(null);
  const activaRef = useRef(null);
  activaRef.current = activa;

  const cargarConvs = useCallback(async () => {
    try {
      const data = await chatAPI.conversations();
      setConvs(data || []);
    } catch {
      /* noop */
    } finally {
      setCargando(false);
    }
  }, []);

  const cargarMensajes = useCallback(async (cid) => {
    if (!cid) return;
    try {
      const data = await chatAPI.messages(cid);
      setMensajes(data || []);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    cargarConvs();
    const t = setInterval(() => {
      cargarConvs();
      if (activaRef.current) cargarMensajes(activaRef.current);
    }, 5000);
    return () => clearInterval(t);
  }, [cargarConvs, cargarMensajes]);

  useEffect(() => {
    cargarMensajes(activa);
  }, [activa, cargarMensajes]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const enviar = async () => {
    const contenido = texto.trim();
    if (!contenido || !activa || enviando) return;
    setEnviando(true);
    try {
      const msg = await chatAPI.send(activa, contenido);
      setMensajes((prev) => [...prev, msg]);
      setTexto('');
      cargarConvs();
      refreshUnread();
    } catch {
      /* noop */
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Mensajes</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Conversaciones con otros usuarios · chat por polling (US-40)
      </Typography>

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', height: 620, display: 'flex' }}>
        {/* Lista */}
        <Box sx={{ width: { xs: activa ? 0 : '100%', sm: 320 }, borderRight: 1, borderColor: 'divider', overflow: 'auto', display: { xs: activa ? 'none' : 'block', sm: 'block' } }}>
          {cargando ? (
            <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
          ) : convs.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <ChatIcon color="disabled" sx={{ fontSize: 40 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No tienes conversaciones. Usa “Contactar vendedor” en cualquier publicación.
              </Typography>
              <Button size="small" component={RouterLink} to="/catalog" sx={{ mt: 1 }}>
                Explorar catálogo
              </Button>
            </Box>
          ) : (
            <List disablePadding>
              {convs.map((c) => (
                <ListItemButton key={c.id} selected={activa === c.id} onClick={() => setActiva(c.id)}
                  sx={{ alignItems: 'flex-start', py: 1.5 }}>
                  <ListItemAvatar sx={{ minWidth: 56 }}>
                    <Badge badgeContent={c.noLeidos} color="error" overlap="circular">
                      <Avatar src={c.otro?.avatarUrl || undefined}>{(c.otro?.username || '?')[0].toUpperCase()}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" noWrap>{c.otro?.nombre || c.otro?.username || 'Usuario'}</Typography>
                        <Typography variant="caption" color="text.secondary">{hora(c.ultimoFecha)}</Typography>
                      </Stack>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {c.ultimoMensaje || 'Sin mensajes'}
                        </Typography>
                        {c.card && (
                          <Typography variant="caption" color="primary" noWrap sx={{ display: 'block' }}>
                            Re: {c.card.nombre}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>

        {/* Ventana */}
        <Box sx={{ flexGrow: 1, display: { xs: activa ? 'flex' : 'none', sm: 'flex' }, flexDirection: 'column' }}>
          {!activa ? (
            <Stack alignItems="center" justifyContent="center" sx={{ flexGrow: 1, color: 'text.secondary' }}>
              <ChatIcon sx={{ fontSize: 48, opacity: 0.4 }} />
              <Typography variant="body2">Selecciona una conversación</Typography>
            </Stack>
          ) : (
            <>
              <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Badge badgeContent={convs.find((c) => c.id === activa)?.noLeidos || 0} color="error" overlap="circular">
                  <Avatar sx={{ width: 36, height: 36 }}>
                    {(convs.find((c) => c.id === activa)?.otro?.username || '?')[0].toUpperCase()}
                  </Avatar>
                </Badge>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">
                    {convs.find((c) => c.id === activa)?.otro?.nombre ||
                      convs.find((c) => c.id === activa)?.otro?.username}
                  </Typography>
                  {convs.find((c) => c.id === activa)?.card && (
                    <Typography variant="caption" color="primary"
                      component={RouterLink} to={`/cards/${convs.find((c) => c.id === activa).card.id}`}
                      sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                      {convs.find((c) => c.id === activa).card.nombre} <OpenIcon sx={{ fontSize: 12 }} />
                    </Typography>
                  )}
                </Box>
                <IconButton size="small" onClick={() => setActiva(null)} sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>✕</IconButton>
              </Box>

              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'grey.50' }}>
                {mensajes.map((m) => (
                  <Box key={m.id} sx={{ alignSelf: m.mio ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        px: 1.75, py: 1, borderRadius: 2,
                        bgcolor: m.mio ? 'primary.main' : 'background.paper',
                        color: m.mio ? 'primary.contrastText' : 'text.primary',
                        border: m.mio ? 'none' : 1, borderColor: 'divider',
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {m.contenido}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', textAlign: 'right' }}>
                        {hora(m.createdAt)}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                <div ref={finRef} />
              </Box>

              <Divider />
              <Stack direction="row" spacing={1} sx={{ p: 1.5 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Escribe un mensaje…"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
                  inputProps={{ maxLength: 500 }}
                />
                <IconButton color="primary" onClick={enviar} disabled={enviando || !texto.trim()}>
                  <SendIcon />
                </IconButton>
              </Stack>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
