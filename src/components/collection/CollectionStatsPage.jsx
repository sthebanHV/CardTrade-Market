import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Stack, Grid, LinearProgress, Divider,
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
} from '@mui/material';
import { collectionAPI } from '../../api/apiClient';

const fmt = (n) => Number(n || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

export const CollectionStatsPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    collectionAPI.stats().then(setStats).catch(() => setError('No se pudieron cargar las estadísticas.'));
  }, []);

  if (error) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button component={Link} to="/my-collection" sx={{ mt: 2 }}>← Volver a mi colección</Button>
      </Box>
    );
  }
  if (!stats) {
    return <Stack alignItems="center" sx={{ py: 6 }}><CircularProgress /></Stack>;
  }

  const maxJuego = Math.max(1, ...stats.porJuego.map((j) => Number(j.valor || 0)));
  const maxRareza = Math.max(1, ...stats.porRareza.map((r) => Number(r.cantidad || 0)));
  const colores = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899'];

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>Valor de mi colección</Typography>
          <Typography variant="body2" color="text.secondary">Estadísticas generales (US-31)</Typography>
        </Box>
        <Button variant="outlined" component={Link} to="/my-collection">← Volver</Button>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Valor total', value: fmt(stats.totalValor), color: 'primary' },
          { label: 'Total de cartas', value: stats.totalCartas, color: 'primary' },
          { label: 'Valor promedio', value: fmt(stats.valorPromedio), color: 'primary' },
          {
            label: 'Última agregada',
            value: stats.ultimaAgregada ? new Date(stats.ultimaAgregada).toLocaleDateString('es-MX') : '—',
            color: 'primary',
          },
        ].map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="overline" color="text.secondary">{s.label}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: `${s.color}.main` }}>{s.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Valor por juego</Typography>
            {stats.porJuego.length === 0 && (
              <Typography variant="body2" color="text.secondary">Sin datos todavía.</Typography>
            )}
            <Stack spacing={1.5}>
              {stats.porJuego.map((j, idx) => (
                <Box key={j.juego}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">{j.juego} ({j.cantidad})</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{fmt(j.valor)}</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(Number(j.valor) / maxJuego) * 100}
                    sx={{
                      height: 8, borderRadius: 4, mt: 0.5,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: colores[idx % colores.length] },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Cartas por rareza</Typography>
            {stats.porRareza.length === 0 && (
              <Typography variant="body2" color="text.secondary">Sin datos todavía.</Typography>
            )}
            <Stack spacing={1.5}>
              {stats.porRareza.map((r, idx) => (
                <Box key={r.rareza}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">{r.rareza}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{r.cantidad}</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(Number(r.cantidad) / maxRareza) * 100}
                    sx={{
                      height: 8, borderRadius: 4, mt: 0.5,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: colores[(idx + 3) % colores.length] },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Top 5 cartas más valiosas</Typography>
            <Divider sx={{ mb: 1 }} />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Carta</TableCell>
                    <TableCell align="right">Valor estimado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.topValiosas.map((t, idx) => (
                    <TableRow key={t.cardId} hover>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Button component={Link} to={`/cards/${t.cardId}`} size="small" sx={{ textTransform: 'none' }}>
                          {t.nombre}
                        </Button>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>{fmt(t.valor)}</TableCell>
                    </TableRow>
                  ))}
                  {stats.topValiosas.length === 0 && (
                    <TableRow><TableCell colSpan={3} align="center" color="text.secondary">Sin cartas aún</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
