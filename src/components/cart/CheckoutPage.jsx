import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Divider, Alert, TextField,
  Stepper, Step, StepLabel, Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, Chip, CircularProgress, InputAdornment,
} from '@mui/material';
import {
  LocalShipping as ShipIcon, CreditCard as CardIcon,
  CheckCircle as OkIcon, Person as UserIcon, SupportAgent as GuestIcon,
} from '@mui/icons-material';
import { useStore, carritoVigente } from '../../store';
import { ordersAPI, checkoutAPI, addressesAPI } from '../../api/apiClient';

const ENVIO = { ESTANDAR: 5.99, EXPRESS: 12.99 };
const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const PASOS = ['Identificación', 'Envío', 'Pago'];

const METODOS = [
  { id: 'TARJETA', label: 'Tarjeta de crédito/débito', hint: 'Visa, Mastercard, Amex' },
  { id: 'PAYPAL', label: 'PayPal', hint: 'Pagar con tu cuenta PayPal' },
  { id: 'OXXO', label: 'OXXO', hint: 'Referencia de pago en efectivo' },
  { id: 'TRANSFERENCIA', label: 'Transferencia bancaria', hint: 'CLABE interbancaria' },
];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, user, token, clearCart } = useStore();
  const items = carritoVigente(cart);

  const [step, setStep] = useState(0);
  const [modo, setModo] = useState(token ? 'sesion' : null); // sesion | invitado
  const [guest, setGuest] = useState({ email: '', nombre: '' });
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [manualAddr, setManualAddr] = useState(null); // null = sin form abierto
  const [shipping, setShipping] = useState('ESTANDAR');
  const [metodo, setMetodo] = useState('TARJETA');
  const [tarjeta, setTarjeta] = useState({ numero: '', exp: '', cvv: '', titular: '' });
  const [clabe, setClabe] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      addressesAPI.list()
        .then((list) => {
          setAddresses(list);
          const def = list.find((a) => a.predeterminada) || list[0];
          if (def) setAddressId(def.id);
        })
        .catch(() => setAddresses([]));
    }
  }, [token]);

  const subtotal = useMemo(
    () => items.reduce((t, i) => t + parseFloat(i.price || 0), 0),
    [items]
  );
  const envio = ENVIO[shipping];
  const total = subtotal + envio;

  if (items.length === 0) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
        <Alert severity="info">Tu carrito está vacío.</Alert>
        <Button component={Link} to="/cards" variant="contained" sx={{ mt: 2 }}>
          Ver catálogo
        </Button>
      </Box>
    );
  }

  const dirElegida = addresses.find((a) => a.id === addressId);
  const addrFinal = manualAddr || dirElegida;

  const validarPaso = () => {
    if (step === 0) {
      if (modo === 'invitado') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) return 'Ingresa un correo válido';
        if (!guest.nombre.trim()) return 'Ingresa tu nombre';
      }
      if (!modo) return 'Elige cómo quieres comprar';
    }
    if (step === 1) {
      if (!manualAddr && !addrFinal) return 'Elige o registra una dirección de envío';
      if (manualAddr) {
        for (const k of ['nombreCompleto', 'linea1', 'ciudad', 'estado', 'codigoPostal']) {
          if (!String(manualAddr[k] || '').trim()) return 'Completa todos los campos de la dirección';
        }
      }
    }
    if (step === 2 && metodo === 'TARJETA') {
      const digits = tarjeta.numero.replace(/\s/g, '');
      if (digits.length < 13 || digits.length > 19) return 'Número de tarjeta inválido';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjeta.exp)) return 'Vencimiento MM/AA inválido';
      if (!/^\d{3,4}$/.test(tarjeta.cvv)) return 'CVV inválido';
      if (!tarjeta.titular.trim()) return 'Ingresa el titular';
    }
    if (step === 2 && metodo === 'TRANSFERENCIA' && clabe.replace(/\s/g, '').length !== 18) {
      return 'La CLABE debe tener 18 dígitos';
    }
    return '';
  };

  const next = () => {
    const err = validarPaso();
    setError(err);
    if (!err) setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => {
    setError('');
    setStep((s) => Math.max(s - 1, 0));
  };

  const direccionPayload = () => {
    const a = manualAddr || dirElegida;
    return {
      linea1: a.linea1,
      linea2: a.linea2 || '',
      ciudad: a.ciudad,
      estado: a.estado,
      codigoPostal: a.codigoPostal,
      nombre: a.nombreCompleto || a.nombre || '',
    };
  };

  const pagar = async () => {
    const err = validarPaso();
    setError(err);
    if (err) return;
    setSubmitting(true);
    setError('');
    try {
      const payloadBase = {
        cardIds: items.map((i) => i.cardId),
        paymentMethod: metodo,
        shippingMethod: shipping,
        shippingAddress: direccionPayload(),
      };
      let orden;
      if (modo === 'sesion') {
        orden = await ordersAPI.create(payloadBase);
      } else {
        const res = await checkoutAPI.guest({
          ...payloadBase,
          email: guest.email.trim(),
          nombre: guest.nombre.trim(),
        });
        orden = res.orden || res.order;
      }
      sessionStorage.setItem(
        'ctmUltimaOrden',
        JSON.stringify({ ...orden, guestEmail: modo === 'invitado' ? guest.email : undefined })
      );
      clearCart();
      navigate(`/order-confirmation/${orden.id}`);
    } catch (e) {
      const data = e.response?.data;
      let msg =
        typeof data === 'string' && data
          ? data
          : data?.mensaje || data?.error || 'No se pudo procesar el pago';
      if (e.response?.status === 409) {
        msg = typeof data === 'string' ? data : 'Alguna carta ya no está disponible. Revisa tu carrito.';
      }
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1040, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Finalizar compra</Typography>
      <Stepper activeStep={step} sx={{ mb: 4 }}>
        {PASOS.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* PASO 1 — identidad */}
          {step === 0 && (
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              {token ? (
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <UserIcon color="primary" />
                    <Typography sx={{ fontWeight: 700 }}>
                      Comprar como <strong>{user?.nombre || user?.username}</strong>
                    </Typography>
                    <Chip label="Sesión iniciada" color="success" size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Tus órdenes, direcciones y métodos de pago guardados se usarán en esta compra.
                  </Typography>
                </Stack>
              ) : modo === 'invitado' ? (
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <GuestIcon color="primary" />
                    <Typography sx={{ fontWeight: 700 }}>Comprar como invitado</Typography>
                  </Stack>
                  <TextField
                    label="Correo electrónico" type="email" required fullWidth
                    value={guest.email}
                    onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                    helperText="Enviaremos el comprobante de tu compra a este correo"
                  />
                  <TextField
                    label="Nombre completo" required fullWidth
                    value={guest.nombre}
                    onChange={(e) => setGuest({ ...guest, nombre: e.target.value })}
                  />
                  <Alert severity="info">
                    También puedes <Link to="/login">iniciar sesión</Link> para guardar tu historial y
                    direcciones. Si tu correo ya tiene cuenta, la compra quedará vinculada a ella.
                  </Alert>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 700 }}>¿Cómo quieres comprar?</Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Paper
                      variant="outlined" sx={{ p: 2, borderRadius: 3, cursor: 'pointer', flexGrow: 1,
                        borderColor: 'primary.main', '&:hover': { bgcolor: 'action.hover' } }}
                      onClick={() => navigate('/login')}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <UserIcon color="primary" />
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>Iniciar sesión</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Usa tu cuenta y direcciones guardadas
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                    <Paper
                      variant="outlined" sx={{ p: 2, borderRadius: 3, cursor: 'pointer', flexGrow: 1,
                        '&:hover': { bgcolor: 'action.hover' } }}
                      onClick={() => setModo('invitado')}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <GuestIcon color="action" />
                        <Box>
                          <Typography sx={{ fontWeight: 700 }}>Continuar como invitado</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Compra rápida con tu correo
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Stack>
                </Stack>
              )}
            </Paper>
          )}

          {/* PASO 2 — envío */}
          {step === 1 && (
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Dirección de envío</Typography>

                {token && !manualAddr && (
                  <>
                    {addresses.length === 0 ? (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Aún no tienes direcciones guardadas. Regístrala abajo o en{' '}
                        <Link to="/settings/addresses">Configuración → Direcciones</Link>.
                      </Alert>
                    ) : (
                      <FormControl sx={{ mb: 2 }} fullWidth>
                        <RadioGroup value={addressId || ''} onChange={(e) => setAddressId(e.target.value)}>
                          {addresses.map((a) => (
                            <FormControlLabel
                              key={a.id}
                              value={a.id}
                              control={<Radio />}
                              label={
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {a.nombreCompleto} {a.predeterminada && <Chip label="Predeterminada" size="small" sx={{ ml: 1 }} />}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {a.linea1}{a.linea2 ? `, ${a.linea2}` : ''}, {a.ciudad}, {a.estado} · C.P. {a.codigoPostal}
                                  </Typography>
                                </Box>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                    <Button size="small" onClick={() => setManualAddr({})}>
                      {addresses.length > 0 ? 'Usar otra dirección' : 'Registrar dirección'}
                    </Button>
                  </>
                )}

                {manualAddr && (
                  <Stack spacing={2} sx={{ mt: token ? 2 : 0 }}>
                    <TextField label="Nombre completo" required fullWidth
                      value={manualAddr.nombreCompleto || ''}
                      onChange={(e) => setManualAddr({ ...manualAddr, nombreCompleto: e.target.value })} />
                    <TextField label="Calle y número" required fullWidth
                      value={manualAddr.linea1 || ''}
                      onChange={(e) => setManualAddr({ ...manualAddr, linea1: e.target.value })} />
                    <TextField label="Interior / referencias (opcional)" fullWidth
                      value={manualAddr.linea2 || ''}
                      onChange={(e) => setManualAddr({ ...manualAddr, linea2: e.target.value })} />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField label="Ciudad" required fullWidth
                        value={manualAddr.ciudad || ''}
                        onChange={(e) => setManualAddr({ ...manualAddr, ciudad: e.target.value })} />
                      <TextField label="Estado" required fullWidth
                        value={manualAddr.estado || ''}
                        onChange={(e) => setManualAddr({ ...manualAddr, estado: e.target.value })} />
                      <TextField label="Código Postal" required fullWidth
                        value={manualAddr.codigoPostal || ''}
                        onChange={(e) => setManualAddr({ ...manualAddr, codigoPostal: e.target.value })} />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" onClick={() => setManualAddr(null)}>
                        {addresses.length > 0 ? 'Volver a mis direcciones' : 'Cancelar'}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Método de envío</Typography>
                <FormControl>
                  <RadioGroup value={shipping} onChange={(e) => setShipping(e.target.value)}>
                    <FormControlLabel
                      value="ESTANDAR" control={<Radio />}
                      label={
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: { xs: 'auto', sm: 380 } }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <ShipIcon color="action" />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>Estándar (3–7 días)</Typography>
                              <Typography variant="caption" color="text.secondary">Entrega estimada en 5–7 días hábiles</Typography>
                            </Box>
                          </Stack>
                          <Typography sx={{ fontWeight: 800 }}>{fmt(ENVIO.ESTANDAR)}</Typography>
                        </Stack>
                      }
                    />
                    <FormControlLabel
                      value="EXPRESS" control={<Radio />}
                      label={
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: { xs: 'auto', sm: 380 } }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <ShipIcon color="primary" />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>Express (1–2 días)</Typography>
                              <Typography variant="caption" color="text.secondary">Entrega estimada en 1–2 días hábiles</Typography>
                            </Box>
                          </Stack>
                          <Typography sx={{ fontWeight: 800 }}>{fmt(ENVIO.EXPRESS)}</Typography>
                        </Stack>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Stack>
          )}

          {/* PASO 3 — pago */}
          {step === 2 && (
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Método de pago</Typography>
                <FormControl>
                  <RadioGroup value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                    {METODOS.map((m) => (
                      <FormControlLabel key={m.id} value={m.id} control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{m.label}</Typography>
                            <Typography variant="caption" color="text.secondary">{m.hint}</Typography>
                          </Box>
                        } />
                    ))}
                  </RadioGroup>
                </FormControl>

                {metodo === 'TARJETA' && (
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                      label="Número de tarjeta" fullWidth required inputProps={{ maxLength: 19 }}
                      value={tarjeta.numero}
                      onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value.replace(/[^\d ]/g, '') })}
                      InputProps={{ startAdornment: <InputAdornment position="start"><CardIcon /></InputAdornment> }}
                      placeholder="4242 4242 4242 4242"
                    />
                    <Stack direction="row" spacing={2}>
                      <TextField label="Vencimiento (MM/AA)" required fullWidth inputProps={{ maxLength: 5 }}
                        value={tarjeta.exp}
                        onChange={(e) => setTarjeta({ ...tarjeta, exp: e.target.value.replace(/[^\d/]/g, '') })}
                        placeholder="12/29" />
                      <TextField label="CVV" required fullWidth inputProps={{ maxLength: 4 }}
                        type="password" value={tarjeta.cvv}
                        onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value.replace(/\D/g, '') })}
                        placeholder="•••" />
                    </Stack>
                    <TextField label="Titular" required fullWidth
                      value={tarjeta.titular}
                      onChange={(e) => setTarjeta({ ...tarjeta, titular: e.target.value.toUpperCase() })} />
                    <Alert severity="info" variant="outlined">
                      Pago simulado de demostración. Solo se conservan los últimos 4 dígitos y la marca;
                      el CVV nunca se almacena.
                    </Alert>
                  </Stack>
                )}
                {metodo === 'PAYPAL' && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Serás redirigido a PayPal para completar el pago simulado.
                  </Alert>
                )}
                {metodo === 'OXXO' && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Recibirás una referencia de pago para liquidar en efectivo en cualquier tienda OXXO.
                  </Alert>
                )}
                {metodo === 'TRANSFERENCIA' && (
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField label="CLABE interbancaria" fullWidth required inputProps={{ maxLength: 18 }}
                      value={clabe} onChange={(e) => setClabe(e.target.value.replace(/\D/g, ''))}
                      placeholder="012345678901234567" />
                    <Alert severity="info" variant="outlined">
                      Te enviaremos los datos bancarios para completar la transferencia.
                    </Alert>
                  </Stack>
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Resumen del pedido</Typography>
                <Typography variant="body2" color="text.secondary">
                  {items.length} artículo{items.length > 1 ? 's' : ''} · Envío {shipping === 'ESTANDAR' ? 'estándar' : 'express'} ·{' '}
                  {METODOS.find((m) => m.id === metodo)?.label}
                </Typography>
              </Paper>
            </Stack>
          )}
        </Box>

        {/* Resumen lateral */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, width: { xs: '100%', md: 330 }, position: { md: 'sticky' }, top: { md: 90 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>Tu pedido</Typography>
          <Stack spacing={1} sx={{ mt: 1.5 }}>
            {items.map((i) => (
              <Stack key={i.cardId} direction="row" justifyContent="space-between" spacing={1}>
                <Typography variant="body2" noWrap sx={{ maxWidth: 170 }}>{i.cardName}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, flexShrink: 0 }}>{fmt(i.price)}</Typography>
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Subtotal</Typography>
              <Typography variant="body2">{fmt(subtotal)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Envío</Typography>
              <Typography variant="body2">{fmt(envio)}</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 800 }}>TOTAL</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>{fmt(total)}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {step > 0 && (
              <Button variant="outlined" fullWidth onClick={back} disabled={submitting}>
                Atrás
              </Button>
            )}
            {step < 2 ? (
              <Button variant="contained" fullWidth onClick={next}>Continuar</Button>
            ) : (
              <Button
                variant="contained" fullWidth
                startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <OkIcon />}
                disabled={submitting}
                onClick={pagar}
              >
                {submitting ? 'Procesando…' : `Pagar ${fmt(total)}`}
              </Button>
            )}
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
            Compra protegida · Pago simulado
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};
