import { Box, Button, Container, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => (
  <Container maxWidth="sm">
    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          width: 88, height: 88, borderRadius: '50%', mx: 'auto', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          bgcolor: 'error.light', color: 'error.dark',
        }}
      >
        <LockOutlined sx={{ fontSize: 44 }} />
      </Box>
      <Typography variant="h5" sx={{ mt: 3, fontWeight: 700 }}>
        403 · No tienes acceso a esta sección
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Tu cuenta no tiene los permisos necesarios para ver este contenido.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
        Volver al inicio
      </Button>
    </Box>
  </Container>
);
