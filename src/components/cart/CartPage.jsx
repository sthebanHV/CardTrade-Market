import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Paper,
} from '@mui/material';
import { useStore } from '../../store';

export const CartPage = () => {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const navigate = useNavigate();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Carrito Vacío</Typography>
        <Typography variant="body1" color="text.secondary">
          Añade cartas a tu carrito para comenzar a comprar
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/">
          Ver Cartas
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Carrito de Compras</Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Carta</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.cardId}>
                <TableCell>{item.cardName}</TableCell>
                <TableCell align="right">${parseFloat(item.price || 0).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" color="error" onClick={() => removeFromCart(item.cardId)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>
          Finalizar Compra
        </Button>
      </Box>
    </Box>
  );
};
