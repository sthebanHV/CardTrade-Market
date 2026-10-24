import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Badge, Fab, Tooltip } from '@mui/material';
import { CompareArrows as CompareIcon } from '@mui/icons-material';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useStore } from './store';

export const App = () => {
  const compare = useStore((s) => s.compare);
  const location = useLocation();
  const enCompare = location.pathname === '/compare';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 4 } }}>
        <Outlet />
      </Box>
      <Footer />

      {compare.length > 0 && !enCompare && (
        <Tooltip title="Comparar cartas seleccionadas">
          <Fab
            component={RouterLink}
            to={`/compare?ids=${compare.map((c) => c.id).join(',')}`}
            color="primary"
            variant="extended"
            sx={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
              boxShadow: '0 8px 24px rgba(30,64,175,0.4)',
            }}
          >
            <CompareIcon sx={{ mr: 1 }} />
            Comparar ({compare.length})
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};

export default App;
