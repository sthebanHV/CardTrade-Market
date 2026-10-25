import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Grid, Paper, Typography, TextField, Button, Stack, MenuItem,
  Autocomplete, Chip, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  Rating, Breadcrumbs, Link as MuiLink,
} from '@mui/material';
import { Visibility as PreviewIcon, CheckCircle as SaveIcon } from '@mui/icons-material';
import { cardsAPI, platformAPI } from '../../api/apiClient';
import { useStore } from '../../store';
import { ImageUploader } from './ImageUploader';

const CONDICIONES = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played'];
const RAREZAS = ['Common', 'Uncommon', 'Rare', 'Holo Rare', 'Ultra Rare', 'Secret Rare'];

export const PublishPage = () => {
  const navigate = useNavigate();
  const showToast = useStore((s) => s.showToast);

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    edition: '',
    rarity: '',
    condition: 'Near Mint',
    precio: '',
    stock: '1',
    descripcion: '',
  });
  const [fotos, setFotos] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    platformAPI.categories()
      .then((cats) => setJuegos((cats || []).map((c) => c.juego)))
      .catch(() => {});
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validar = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio';
    if (!form.tipo.trim()) return 'El juego es obligatorio';
    const p = Number(form.precio);
    if (!form.precio || Number.isNaN(p) || p <= 0) return 'Ingresa un precio mayor a 0';
    return '';
  };

  const payload = () => ({
    nombre: form.nombre.trim(),
    tipo: form.tipo.trim(),
    edition: form.edition.trim() || null,
    rarity: form.rarity || null,
    condition: form.condition || null,
    precio: Number(form.precio),
    stock: Math.max(1, Number(form.stock) || 1),
    descripcion: form.descripcion.trim() || null,
    imagenes: fotos,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validar();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setEnviando(true);
    try {
      const creada = await cardsAPI.create(payload());
      showToast({ message: 'Carta publicada correctamente', severity: 'success' });
      navigate('/my-listings');
      return creada;
    } catch (err) {
      setError(err?.response?.data?.error || 'No se pudo publicar la carta. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const precioOk = Number(form.precio) > 0;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={RouterLink} to="/" underline="hover" color="inherit">Inicio</MuiLink>
        <MuiLink component={RouterLink} to="/my-listings" underline="hover" color="inherit">Mis publicaciones</MuiLink>
        <Typography color="text.primary">Publicar carta</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ fontWeight: 800 }}>Publicar carta</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Completa los datos y agrega hasta 5 fotos. Podrás pausar o editar la publicación cuando quieras.
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
                Datos de la carta
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  label="Nombre de la carta *"
                  value={form.nombre}
                  onChange={set('nombre')}
                  inputProps={{ maxLength: 120 }}
                  required
                />
                <Autocomplete
                  freeSolo
                  options={juegos}
                  value={form.tipo}
                  onChange={(e, v) => setForm({ ...form, tipo: v || '' })}
                  onInputChange={(e, v) => setForm({ ...form, tipo: v || '' })}
                  renderInput={(params) => (
                    <TextField {...params} label="Juego *" required placeholder="Pokémon, Magic, Yu-Gi-Oh!…" />
                  )}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Edición / Set" value={form.edition} onChange={set('edition')} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField select label="Rareza" value={form.rarity} onChange={set('rarity')} fullWidth>
                      <MenuItem value=""><em>—</em></MenuItem>
                      {RAREZAS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField select label="Estado" value={form.condition} onChange={set('condition')} fullWidth>
                      {CONDICIONES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Precio (MXN) *"
                      type="number"
                      value={form.precio}
                      onChange={set('precio')}
                      inputProps={{ min: 0, step: 0.01 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Stock"
                      type="number"
                      value={form.stock}
                      onChange={set('stock')}
                      inputProps={{ min: 1 }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Descripción"
                  value={form.descripcion}
                  onChange={set('descripcion')}
                  multiline
                  minRows={4}
                  inputProps={{ maxLength: 2000 }}
                  helperText={`${form.descripcion.length}/2000 caracteres`}
                />
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
                Fotos (máx. 5)
              </Typography>
              <Box sx={{ mt: 2 }}>
                <ImageUploader fotos={fotos} onChange={setFotos} onError={(m) => setError(m)} />
              </Box>
            </Paper>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2.5 }}>
              <Button
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={() => setPreview(true)}
                disabled={!form.nombre || !precioOk}
                fullWidth
              >
                Vista previa
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                loading={enviando}
                fullWidth
              >
                Publicar carta
              </Button>
            </Stack>
            <Button component={RouterLink} to="/my-listings" sx={{ mt: 1 }} fullWidth>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={preview} onClose={() => setPreview(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Vista previa</DialogTitle>
        <DialogContent dividers>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Box
              component="img"
              src={fotos[0] || 'https://placehold.co/480x640?text=Sin+Imagen'}
              alt={form.nombre}
              sx={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 2, bgcolor: '#F9FAFB' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 1.5 }}>{form.nombre || 'Sin nombre'}</Typography>
            <Typography variant="body2" color="text.secondary">{form.tipo || 'Sin juego'}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
              {form.rarity && <Chip size="small" label={form.rarity} variant="outlined" />}
              {form.condition && <Chip size="small" label={form.condition} color="primary" variant="outlined" />}
              {form.edition && <Chip size="small" label={form.edition} variant="outlined" />}
            </Stack>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mt: 1.5 }}>
              ${precioOk ? Number(form.precio).toFixed(2) : '0.00'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {form.descripcion || 'Sin descripción'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
              {fotos.map((src, i) => (
                <Box key={i} component="img" src={src} alt="" sx={{ width: 54, height: 54, objectFit: 'cover', borderRadius: 1.5 }} />
              ))}
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreview(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
