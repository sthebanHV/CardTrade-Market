import { Box, Container, Typography, Link as MuiLink, Stack, Divider, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const cols = [
  {
    title: 'Explorar',
    links: [
      ['Catálogo', '/cards'],
      ['Ofertas', '/offers'],
      ['Por juego', '/games'],
    ],
  },
  {
    title: 'Comprar',
    links: [
      ['Carrito', '/cart'],
      ['Mis compras', '/my-purchases'],
      ['Mis alertas', '/my-alerts'],
    ],
  },
  {
    title: 'Vender',
    links: [
      ['Publicar carta', '/sell/new'],
      ['Mis publicaciones', '/my-listings'],
      ['Mis ventas', '/my-sales'],
    ],
  },
  {
    title: 'Comunidad',
    links: [
      ['Mi colección', '/my-collection'],
      ['Favoritos', '/favorites'],
      ['Mensajes', '/messages'],
    ],
  },
];

export const Footer = () => (
  <Box component="footer" sx={{ mt: 'auto', bgcolor: '#111827', color: '#D1D5DB', pt: 6, pb: 3 }}>
    <Container maxWidth="lg">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between">
        <Box sx={{ maxWidth: 300 }}>
          <Typography variant="h6" sx={{ color: '#fff', display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box component="span">🃏</Box> CardTrade Market
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#9CA3AF', lineHeight: 1.7 }}>
            El marketplace de cartas coleccionables: compra, vende y gestiona tu colección
            de Pokémon, Magic, Yu-Gi-Oh y más.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Chip size="small" label="Compra segura" sx={{ bgcolor: '#1F2937', color: '#D1FAE5' }} />
            <Chip size="small" label="Vendedores verificados" sx={{ bgcolor: '#1F2937', color: '#BFDBFE' }} />
          </Stack>
        </Box>
        <Stack direction="row" spacing={{ xs: 3, sm: 6 }} flexWrap="wrap" useFlexGap>
          {cols.map((col) => (
            <Box key={col.title}>
              <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1.5 }}>{col.title}</Typography>
              <Stack spacing={1}>
                {col.links.map(([label, to]) => (
                  <MuiLink
                    key={to}
                    component={Link}
                    to={to}
                    underline="hover"
                    variant="body2"
                    sx={{ color: '#9CA3AF', '&:hover': { color: '#93C5FD' } }}
                  >
                    {label}
                  </MuiLink>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Divider sx={{ my: 3, borderColor: '#1F2937' }} />
      <Typography variant="caption" sx={{ color: '#6B7280' }}>
        © {new Date().getFullYear()} CardTrade Market · Marketplace de cartas coleccionables
      </Typography>
    </Container>
  </Box>
);
