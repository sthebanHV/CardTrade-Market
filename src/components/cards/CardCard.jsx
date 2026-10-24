import { Card as MUICard, CardContent, CardMedia, CardActions, Typography, Button, Chip, Stack } from '@mui/material';
import { useStore } from '../../store';

export const CardCard = ({ card }) => {
  const addToCart = useStore((s) => s.addToCart);

  return (
    <MUICard sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={
          card.imagenes && card.imagenes.length > 0
            ? card.imagenes[0]
            : 'https://placehold.co/300x200?text=Sin+Imagen'
        }
        alt={card.nombre}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {card.nombre}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip size="small" label={card.tipo} />
          <Chip size="small" label={card.rarity} variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary" noWrap>
          {card.edition}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${Number(card.precio).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => addToCart(card.id, card.nombre, card.precio)}
        >
          Agregar al carrito
        </Button>
      </CardActions>
    </MUICard>
  );
};
