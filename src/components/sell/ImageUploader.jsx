import { useRef, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography, CircularProgress } from '@mui/material';
import { AddPhotoAlternate as AddIcon, Close as CloseIcon } from '@mui/icons-material';

const MAX_FOTOS = 5;
const MAX_LADO = 1600;

const comprimir = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_LADO || height > MAX_LADO) {
        const ratio = Math.min(MAX_LADO / width, MAX_LADO / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });

export const ImageUploader = ({ fotos, onChange, onError }) => {
  const inputRef = useRef(null);
  const [cargando, setCargando] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    if (fotos.length + files.length > MAX_FOTOS) {
      onError?.(`Máximo ${MAX_FOTOS} fotos por publicación`);
      return;
    }
    setCargando(true);
    try {
      const nuevas = [];
      for (const f of files) {
        if (!f.type.startsWith('image/')) continue;
        nuevas.push(await comprimir(f));
      }
      onChange([...fotos, ...nuevas]);
    } catch {
      onError?.('No se pudo procesar alguna imagen');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {fotos.map((src, i) => (
          <Box key={i} sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={src}
              alt={`Foto ${i + 1}`}
              sx={{
                width: 88, height: 88, objectFit: 'cover', borderRadius: 2,
                border: '1px solid', borderColor: 'divider',
              }}
            />
            <IconButton
              size="small"
              onClick={() => onChange(fotos.filter((_, j) => j !== i))}
              aria-label={`Quitar foto ${i + 1}`}
              sx={{
                position: 'absolute', top: -8, right: -8, bgcolor: 'background.paper',
                border: '1px solid', borderColor: 'divider', width: 24, height: 24,
                '&:hover': { bgcolor: 'error.light', color: '#fff' },
              }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        ))}
        {fotos.length < MAX_FOTOS && (
          <Button
            variant="outlined"
            component="span"
            onClick={() => inputRef.current?.click()}
            disabled={cargando}
            sx={{
              width: 88, height: 88, minWidth: 0, borderRadius: 2,
              borderStyle: 'dashed', flexDirection: 'column', gap: 0.5, lineHeight: 1.2,
            }}
          >
            {cargando ? <CircularProgress size={22} /> : <AddIcon />}
            <Typography variant="caption">Agregar</Typography>
          </Button>
        )}
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        {fotos.length}/{MAX_FOTOS} fotos · se comprimen automáticamente (máx. 1600px)
      </Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFiles}
      />
    </Box>
  );
};
