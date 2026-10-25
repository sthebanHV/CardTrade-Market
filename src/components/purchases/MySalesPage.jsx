import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, Grid, CircularProgress, Alert,
} from '@mui/material';
import { ordersAPI } from '../../api/apiClient';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const fmtFecha = (d) => new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });

export const MySalesPage = () => {
  const [ventas, setVentas] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([ordersAPI.sales(), ordersAPI.salesSummary()])
      .then(([v, s]) => { setVentas(v); setResumen(s); })
      .catch(() => setError('No se pudo cargar tu historial de ventas.'))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>;

  return (
    <Box sx={{ maxWidth: 950, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Mis ventas</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Resumen y detalle de lo que has vendido (US-35)
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {resumen && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Monto total', value: fmt(resumen.montoTotal) },
            { label: 'Órdenes', value: resumen.numOrdenes },
            { label: 'Unidades vendidas', value: resumen.unidadesVendidas },
            { label: 'Promedio por orden', value: fmt(resumen.promedioPorOrden) },
          ].map((s) => (
            <Grid item xs={6} md={3} key={s.label}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="overline" color="text.secondary">{s.label}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{s.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {ventas.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>Aún no has vendido nada</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Publica tu primera carta para empezar a vender.
          </Typography>
          <Button variant="contained" component={Link} to="/sell/new">Publicar una carta</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {ventas.map((o) => {
            const mios = (o.items || []).filter((i) => i.vendedorId);
            return (
              <Paper key={o.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontWeight: 800 }}>{o.numeroOrden}</Typography>
                      <Chip
                        label={o.status === 'PAID' ? 'Pago recibido' : o.status}
                        color={o.status === 'PAID' ? 'success' : 'default'}
                        size="small"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {fmtFecha(o.createdAt)} · Comprador: {o.buyerName || '—'}
                      {o.guestEmail ? ` (${o.guestEmail})` : ''}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {mios.length || o.items?.length || o.cardIds?.length || 0} artículo(s) ·{' '}
                      {o.paymentMethod}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{fmt(o.total)}</Typography>
                    <Button variant="outlined" size="small" component={Link} to={`/my-purchases/${o.id}`}>
                      Detalle
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};
