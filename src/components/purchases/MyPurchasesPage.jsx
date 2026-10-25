import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Chip, MenuItem, TextField,
  CircularProgress, Alert, Divider,
} from '@mui/material';
import { LocalShipping as ShipIcon, ReceiptLong as ReceiptIcon } from '@mui/icons-material';
import { ordersAPI } from '../../api/apiClient';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
const fmtFecha = (d) => new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });

const ESTADOS = {
  PAID: { label: 'Pagada', color: 'success' },
  SHIPPED: { label: 'Enviada', color: 'info' },
  DELIVERED: { label: 'Entregada', color: 'success' },
  CANCELLED: { label: 'Cancelada', color: 'error' },
  PENDING: { label: 'Pendiente', color: 'warning' },
};

export const MyPurchasesPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    ordersAPI.purchases()
      .then(setOrdenes)
      .catch(() => setError('No se pudo cargar tu historial de compras.'))
      .finally(() => setCargando(false));
  }, []);

  const filtradas = useMemo(() => {
    if (filtro === 'todas') return ordenes;
    return ordenes.filter((o) => o.status === filtro);
  }, [ordenes, filtro]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Mis compras</Typography>
          <Typography variant="body2" color="text.secondary">Historial de tus órdenes (US-34)</Typography>
        </Box>
        <TextField size="small" select label="Estado" value={filtro} sx={{ minWidth: 170 }}
          onChange={(e) => setFiltro(e.target.value)}>
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="PAID">Pagadas</MenuItem>
          <MenuItem value="SHIPPED">Enviadas</MenuItem>
          <MenuItem value="DELIVERED">Entregadas</MenuItem>
          <MenuItem value="CANCELLED">Canceladas</MenuItem>
        </TextField>
      </Stack>

      {cargando ? (
        <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filtradas.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
          <ReceiptIcon color="disabled" sx={{ fontSize: 48 }} />
          <Typography sx={{ fontWeight: 700, mt: 1 }}>No hay compras {filtro !== 'todas' ? 'con ese estado' : 'todavía'}</Typography>
          <Button variant="contained" component={Link} to="/cards" sx={{ mt: 2 }}>Explorar catálogo</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {filtradas.map((o) => {
            const est = ESTADOS[o.status] || { label: o.status, color: 'default' };
            const nItems = o.items?.length ?? o.cardIds?.length ?? 0;
            return (
              <Paper key={o.id} variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontWeight: 800 }}>{o.numeroOrden}</Typography>
                      <Chip label={est.label} color={est.color} size="small" />
                      {o.trackingStatus && o.trackingStatus !== 'PREPARACION' && (
                        <Chip icon={<ShipIcon />} label={o.trackingStatus.replace('_', ' ').toLowerCase()} size="small" variant="outlined" />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {fmtFecha(o.createdAt)} · {nItems} artículo{nItems !== 1 ? 's' : ''} ·{' '}
                      {o.shippingMethod === 'EXPRESS' ? 'Envío express' : 'Envío estándar'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {o.paymentMethod} · {o.buyerName}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{fmt(o.total)}</Typography>
                    <Button variant="outlined" size="small" component={Link} to={`/my-purchases/${o.id}`}>
                      Ver detalle
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
