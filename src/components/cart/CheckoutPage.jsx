import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, Stack } from '@mui/material';

export const CheckoutPage = () => {
  const [step, setStep] = useState(1); // 1 = dirección, 2 = pago
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'México',
    paymentMethod: 'tarjeta',
  });

  const { cart, getCartTotal } = useStore();
  const total = getCartTotal();

  const handleNext = () => setStep(2);

  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    // Aquí se integraría con Stripe o pasarela de pago
    window.alert(`¡Compra realizada con éxito!\n\nTotal: $${total.toFixed(2)}\nMétodo: ${formData.paymentMethod}\nDirección: ${formData.address}, ${formData.city} ${formData.postalCode}`);
    useStore.getState().clearCart();
    setStep(1);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h4">Finalizar Compra</Typography>

      {/* Progreso de pasos */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ color: step > 1 ? '#1976d2' : '#666' }}>
            1. Dirección
          </Typography>
          <Typography variant="subtitle1" sx={{ color: step > 2 ? '#1976d2' : '#666' }}>
            2. Pago
          </Typography>
        </Box>
        <Box sx={{ ml: 20, width: 4, height: 2, borderRadius: 2, backgroundColor: '#e0e0e0' }}>
          <Box sx={{ width: '25%', height: '100%', borderRadius: 2, backgroundColor: step > 1 ? '#1976d2' : 'transparent' }} />
          <Box sx={{ width: '25%', height: '100%', borderRadius: 2, backgroundColor: step > 2 ? '#1976d2' : 'transparent' }} />
        </Box>
      </Box>

      {/* Paso 1: Dirección */}
      {step === 1 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">Dirección de Envío</Typography>
          <Stack direction="vertical" spacing={2}>
            <TextField
              label="Calle y número"
              variant="outlined"
              fullWidth
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
            <TextField
              label="Ciudad"
              variant="outlined"
              fullWidth
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <TextField
              label="Código Postal"
              variant="outlined"
              fullWidth
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              type="number"
              required
            />
            <TextField
              label="País"
              variant="outlined"
              fullWidth
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
              Anterior
            </Button>
            <Button variant="contained" onClick={handleNext} sx={{ ml: 1 }}>
              Siguiente
            </Button>
          </Box>
        </Box>
      )}

      {/* Paso 2: Pago */}
      {step === 2 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">Método de Pago</Typography>
          <Stack direction="vertical" spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Método</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
              </Select>
            </FormControl>

            {/* Campos adicionales según método */}
            {formData.paymentMethod === 'tarjeta' && (
              <Stack direction="vertical" spacing={2}>
                <TextField
                  label="Número de Tarjeta"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Stack direction="horizontal" spacing={2}>
                  <TextField
                    label="MM/AA"
                    variant="outlined"
                    fullWidth
                    sx={{ width: '45%', mb: 2 }}
                  />
                  <TextField
                    label="CCV"
                    variant="outlined"
                    fullWidth
                    sx={{ width: '45%', mb: 2 }}
                  />
                </Stack>
              </Stack>
            )}

            {formData.paymentMethod === 'transferencia' && (
              <Stack direction="vertical" spacing={2}>
                <TextField
                  label="Número de Cuenta"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="CLABE Interbancaria"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Stack>
            )}
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>Anterior</Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 1, width: '150px' }}
              onClick={handleSubmit}
            >
              Confirmar Compra
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};