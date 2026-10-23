import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import { useStore } from '../../store';

export const CartPage = () => {
  const { cart, removeFromCart, getCartTotal } = useStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Carrito Vacío</Typography>
        <Typography variant="body1">Añade cartas a tu carrito para comenzar a comprar</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.history.back()}>
          Ver Colección
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Carrito de Compras</Typography>
      <TableContainer>
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
                <TableCell align="right">${item.price || 0}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="contained" onClick={() => removeFromCart(item.cardId)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '200px', ml: 2 }}
          onClick={() => window.alert('Procediendo al checkout...')}
        >
          Finalizar Compra
        </Button>
      </Box>
    </Box>
  );
};