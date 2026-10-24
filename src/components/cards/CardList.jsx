import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Alert, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardCard } from './CardCard';
import { cardsAPI } from '../../api/apiClient';
import { useStore } from '../../store';

export const CardList = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const token = useStore((s) => s.token);

  useEffect(() => {
    let activo = true;
    cardsAPI
      .getAll()
      .then((data) => {
        if (activo) setCards(data || []);
      })
      .catch(() => {
        if (activo) setIsError(true);
      })
      .finally(() => {
        if (activo) setIsLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Cartas disponibles</Typography>
        {token && (
          <Button component={Link} to="/dashboard" variant="outlined">
            Publicar carta
          </Button>
        )}
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          No se pudo conectar con el servidor. Intenta de nuevo más tarde.
        </Alert>
      )}

      {!isLoading && !isError && cards.length === 0 && (
        <Typography color="text.secondary">
          No hay cartas disponibles. ¡Sé el primero en publicar!
        </Typography>
      )}

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <CardCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
