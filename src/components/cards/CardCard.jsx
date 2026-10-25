import { Card as MUICard, CardContent, CardMedia, CardActions, Typography, Button, Chip, Stack, Box, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite as FavoriteIcon, Compare as CompareIcon, Check as CheckIcon } from '@mui/icons-material';
import { useStore } from '../../store';

const imgFallback = 'https://placehold.co/300x220/e5e7eb/6b7280?text=Sin+Imagen';

export const CardCard = ({ card }) => {
  const addToCart = useStore((s) => s.addToCart);
  const addToFavorites = useStore((s) => s.addToFavorites);
  const favorites = useStore((s) => s.favorites);
  const compare = useStore((s) => s.compare);
  const toggleCompare = useStore((s) => s.toggleCompare);

  const enOferta = card.precioOferta != null && card.precioOferta < card.precio;
  const descuento = enOferta
    ? Math.round((1 - card.precioOferta / card.precio) * 100)
    : 0;
  const precioFinal = enOferta ? card.precioOferta : card.precio;
  const esFavorito = favorites.some((f) => f.cardId === card.id);
  const enComparacion = compare.some((c) => c.id === card.id);

  return (
    <MUICard sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {enOferta && (
        <Chip
          label={`-${descuento}%`}
          color="error"
          size="small"
          sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2, fontWeight: 700 }}
        />
      )}
      <Box component={Link} to={`/cards/${card.id}`} sx={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={card.imagenes && card.imagenes.length > 0 ? card.imagenes[0] : imgFallback}
          alt={card.nombre}
          sx={{ objectFit: 'cover' }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          component={Link}
          to={`/cards/${card.id}`}
          variant="subtitle1"
          sx={{ fontWeight: 700, color: 'text.primary', textDecoration: 'none', display: 'block' }}
          noWrap
        >
          {card.nombre}
        </Typography>
        <Stack direction="row" spacing={0.75} sx={{ my: 1, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip size="small" label={card.tipo} color="primary" />
          {card.rarity && <Chip size="small" label={card.rarity} variant="outlined" />}
          {card.condition && <Chip size="small" label={card.condition} variant="outlined" color="success" />}
        </Stack>
        <Typography variant="body2" color="text.secondary" noWrap>
          {card.edition}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 1 }}>
          <Typography variant="h6" color={enOferta ? 'error' : 'primary'} sx={{ fontWeight: 800 }}>
            ${Number(precioFinal).toFixed(2)}
          </Typography>
          {enOferta && (
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ${Number(card.precio).toFixed(2)}
            </Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 1.5, pb: 1.5 }}>
        <Button size="small" variant="contained" onClick={() => addToCart(card.id, card.nombre, precioFinal, card.imagenes?.[0])}>
          Agregar
        </Button>
        <Stack direction="row" spacing={0.25}>
          <Tooltip title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
            <IconButton size="small" onClick={() => addToFavorites(card.id, card.nombre)} color={esFavorito ? 'error' : 'default'}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={enComparacion ? 'Quitar de comparación' : 'Comparar'}>
            <IconButton
              size="small"
              onClick={() => toggleCompare(card)}
              color={enComparacion ? 'primary' : 'default'}
            >
              {enComparacion ? <CheckIcon fontSize="small" /> : <CompareIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </MUICard>
  );
};
