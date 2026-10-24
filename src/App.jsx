import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

export const App = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 4 } }}>
      <Outlet />
    </Box>
    <Footer />
  </Box>
);

export default App;
