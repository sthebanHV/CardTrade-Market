import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField, Stack, Alert,
} from '@mui/material';
import { useStore } from '../../store';
import { ordersAPI } from '../../api/apiClient';

export const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'México',
    paymentMethod: 'tarjeta',
  });

  const { cart, getCartTotal, user, token, clearCart } = useStore();
  const total = getCartTotal();
  const navigate = useNavigate();

  if (!token) {
    return (
      <Box sx={{ p: 4, maxWidth: 600 }}>
        <Alert severity="info">
          Inicia sesión para finalizar tu compra.
        </Alert>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/login')}>
          Ir a iniciar sesión
        </Button>
      </Box>
    );
  }

  if (cart.length === 0 && !success) {
    return (
      <Box sx={{ p: 4, maxWidth: 600 }}>
        <Alert severity="info">Tu carrito está vacío.</Alert>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/')}>
          Ver cartas
        </Button>
      </Box>
    );
  }

  const handleNext = () => {
    if (!formData.address || !formData.city || !formData.postalCode) {
      setError('Completa todos los datos de envío');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const order = await ordersAPI.create({
        userId: user?.id,
        cardIds: cart.map((item) => item.cardId),
        total,
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      });
      setOrderId(order.id || '');
      setSuccess(true);
      clearCart();
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data === 'string' && data ? data : 'No se pudo procesar la compra');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Dialog open maxWidth="xs" fullWidth>
        <DialogTitle>¡Compra realizada con éxito!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Total: ${total.toFixed(2)}
            <br />
            Método: {formData.paymentMethod}
            <br />
            Dirección: {formData.address}, {formData.city} {formData.postalCode}
            {orderId && (
              <>
                <br />
                Pedido: {orderId}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')}>Ver cartas</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 600 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Finalizar Compra</Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Typography variant="subtitle1" sx={{ color: step >= 1 ? 'primary.main' : 'text.secondary' }}>
          1. Dirección
        </Typography>
        <Typography variant="subtitle1" sx={{ color: step >= 2 ? 'primary.main' : 'text.secondary' }}>
          2. Pago
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {step === 1 && (
        <Stack spacing={2}>
          <TextField
            label="Calle y número"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Ciudad"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Código Postal"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            type="number"
            required
            fullWidth
          />
          <TextField
            label="País"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleNext}>Siguiente</Button>
          </Box>
        </Stack>
      )}

      {step === 2 && (
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="payment-method-label">Método</InputLabel>
            <Select
              labelId="payment-method-label"
              value={formData.paymentMethod}
              label="Método"
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            >
              <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
            </Select>
          </FormControl>

          {formData.paymentMethod === 'tarjeta' && (
            <>
              <TextField label="Número de Tarjeta" fullWidth />
              <Stack direction="row" spacing={2}>
                <TextField label="MM/AA" fullWidth />
                <TextField label="CCV" fullWidth />
              </Stack>
            </>
          )}

          {formData.paymentMethod === 'transferencia' && (
            <>
              <TextField label="Número de Cuenta" fullWidth />
              <TextField label="CLABE Interbancaria" fullWidth />
            </>
          )}

          <Typography variant="h6">Total a pagar: ${total.toFixed(2)}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => setStep(1)}>Anterior</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Procesando...' : 'Confirmar Compra'}
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};
