import React from 'react';
import { Card as MUICard, Media, Title, Text, Button } from '@mui/material';

export const CardCard = ({ card }) => {
  return (
    <MUICard sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 1, overflow: 'hidden' }}>
      <Media component="img" sx={{ height: 200, width: '100%' }} image={card.imagenes[0]} alt={card.nombre} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          {card.nombre}
        </Typography>
        <Typography component="p">
          {card.tipo} - {card.edition}
        </Typography>
        <Typography component="p">
          Rareza: {card.rarity}
        </Typography>
        <Typography component="p">
          Precio: ${card.precio.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Ver Detalle</Button>
      </CardActions>
    </MUICard>
  );
};