import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, Box, Container } from '@mui/material';
import { useStore } from './store';

export const App = () => {
  const { user, token, cart, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            CardTrade Market
          </Typography>
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart.length} color="secondary" sx={{ mr: 1 }}>
              Carrito
            </Badge>
          </Button>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>
                Salir{user?.username ? ` (${user.username})` : ''}
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Iniciar sesión</Button>
              <Button color="inherit" component={Link} to="/register">Registrarse</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
