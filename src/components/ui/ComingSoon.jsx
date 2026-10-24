import { Box, Button, Chip, Container, Typography } from '@mui/material';
import { Construction } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const ComingSoon = ({ title, hu }) => (
  <Container maxWidth="sm">
    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          width: 88, height: 88, borderRadius: '50%', mx: 'auto', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          bgcolor: 'primary.light', color: 'primary.dark',
        }}
      >
        <Construction sx={{ fontSize: 42 }} />
      </Box>
      <Typography variant="h5" sx={{ mt: 3, fontWeight: 700 }}>{title}</Typography>
      {hu && <Chip label={hu} color="primary" variant="outlined" sx={{ mt: 1.5 }} />}
      <Typography color="text.secondary" sx={{ mt: 1.5 }}>
        Esta sección está en construcción y estará disponible pronto.
      </Typography>
      <Button component={Link} to="/" variant="outlined" sx={{ mt: 3 }}>
        Volver al inicio
      </Button>
    </Box>
  </Container>
);
