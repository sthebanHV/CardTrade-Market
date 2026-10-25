import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box, Grid, Typography, Button, Chip, Stack, Paper, Divider, CircularProgress,
  Alert, Rating, Breadcrumbs, Link as MuiLink, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, Tooltip,
} from '@mui/material';
import {
  ShoppingCart as CartIcon, FlashOn as BuyIcon, Favorite as FavoriteIcon,
  Compare as CompareIcon, Storefront as StoreIcon, CalendarToday as DateIcon,
  Flag as FlagIcon, LibraryAdd as CollectionIcon, NotificationsActive as AlertIcon,
  Share as ShareIcon, Chat as ChatIcon, Link as LinkIcon, Check as CheckIcon,
} from '@mui/icons-material';
import { cardsAPI, usersAPI, chatAPI, marketAPI } from '../../api/apiClient';
import { useStore } from '../../store';
import { ReportModal } from '../sell/ReportModal';
import { AddToCollectionDialog } from '../collection/AddToCollectionDialog';
import { PriceAlertDialog } from '../alerts/PriceAlertDialog';

const gameKeyDe = (tipo) => {
  const t = (tipo || '').toLowerCase();
  if (t.includes('magic')) return 'MAGIC';
  if (t.includes('pok')) return 'POKEMON';
  if (t.includes('yu') || t.includes('yugi')) return 'YUGIOH';
  return null;
};

export const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [seller, setSeller] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [market, setMarket] = useState(null);

  const { addToCart, addToFavorites, favorites, toggleCompare, compare, token, showToast } = useStore();

  const exigirSesion = (accion) => {
    if (!token) {
      showToast({ message: `Inicia sesión para ${accion}`, severity: 'info' });
      navigate('/login');
      return false;
    }
    return true;
  };

  // US-40: contactar al vendedor
  const onContactar = async () => {
    if (!exigirSesion('contactar al vendedor')) return;
    try {
      const vendedorId = seller?.id || card?.vendedorId;
      await chatAPI.start(vendedorId, card.id);
      navigate('/messages');
    } catch (e) {
      const d = e.response?.data;
      showToast({ message: (typeof d === 'string' && d) || d?.error || 'No se pudo abrir la conversación', severity: 'error' });
    }
  };

  // US-43: compartir
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const shareData = {
    url,
    text: card ? `${card.nombre} en CardTrade-Market` : 'CardTrade-Market',
  };
  const enlaces = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'X (Twitter)', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareData.text)}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${url}`)}` },
  ];
  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      showToast({ message: 'No se pudo copiar', severity: 'error' });
    }
  };

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(false);
    setImgIdx(0);
    cardsAPI
      .getById(id)
      .then((data) => {
        if (!activo) return;
        if (!data || !data.id) {
          setError(true);
          return;
        }
        setCard(data);
        if (data.vendedorId) {
          usersAPI.getPublic(data.vendedorId).then((u) => activo && setSeller(u)).catch(() => {});
        }
        const g = gameKeyDe(data.tipo);
        if (g) {
          marketAPI.resolve(g, data.nombre)
            .then((m) => { if (activo) setMarket(m); })
            .catch(() => { if (activo) setMarket(null); });
        }
      })
      .catch(() => activo && setError(true))
      .finally(() => activo && setLoading(false));
    return () => { activo = false; };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
    );
  }

  if (error || !card) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Carta no encontrada</Typography>
        <Button component={Link} to="/cards" variant="contained" sx={{ mt: 2 }}>Ver catálogo</Button>
      </Box>
    );
  }

  const imagenes = card.imagenes?.length ? card.imagenes : ['https://placehold.co/480x640?text=Sin+Imagen'];
  const enOferta = card.precioOferta != null && card.precioOferta < card.precio;
  const descuento = enOferta ? Math.round((1 - card.precioOferta / card.precio) * 100) : 0;
  const precioFinal = enOferta ? card.precioOferta : card.precio;
  const esFavorito = favorites.some((f) => f.cardId === card.id);
  const enComparacion = compare.some((c) => c.id === card.id);
  const stock = card.stock ?? 1;
  const info = [
    ['Nombre', card.nombre],
    ['Juego', card.tipo],
    ['Rareza', card.rarity],
    ['Set / Edición', card.edition],
    ['Estado', card.condition],
  ];

  const onAddCart = () => addToCart(card.id, card.nombre, precioFinal, card.imagenes?.[0]);
  const onBuyNow = () => {
    addToCart(card.id, card.nombre, precioFinal, card.imagenes?.[0]);
    navigate('/checkout');
  };
  const onReport = () => {
    if (!token) {
      showToast({ message: 'Inicia sesión para reportar publicaciones', severity: 'info' });
      navigate('/login');
      return;
    }
    setReportOpen(true);
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/" underline="hover" color="inherit">Inicio</MuiLink>
        <MuiLink component={Link} to="/cards" underline="hover" color="inherit">Catálogo</MuiLink>
        <Typography color="text.primary">{card.nombre}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {card.nombre}
        <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1.5, fontWeight: 500 }}>
          - {card.tipo}
        </Typography>
      </Typography>

      <Grid container spacing={4} sx={{ mt: 1 }}>
        {/* Galería */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Box
              component="img"
              src={imagenes[imgIdx]}
              alt={card.nombre}
              sx={{
                width: '100%', maxHeight: 480, objectFit: 'contain', borderRadius: 2,
                bgcolor: '#F9FAFB', cursor: 'zoom-in',
              }}
            />
            {imagenes.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
                {imagenes.map((src, i) => (
                  <Box
                    key={src + i}
                    component="img"
                    src={src}
                    alt={`Vista ${i + 1}`}
                    onClick={() => setImgIdx(i)}
                    sx={{
                      width: 60, height: 60, objectFit: 'cover', borderRadius: 1.5, cursor: 'pointer',
                      border: '2px solid', borderColor: i === imgIdx ? 'primary.main' : 'divider',
                    }}
                  />
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* Información */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
              Información de la carta
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              {info.map(([label, value]) => (
                <Stack key={label} direction="row" justifyContent="space-between"
                  sx={{ py: 0.75, borderBottom: '1px dashed', borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
                    {value || '—'}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Stack direction="row" alignItems="baseline" spacing={1.5}>
              <Typography variant="h4" color={enOferta ? 'error' : 'primary'} sx={{ fontWeight: 800 }}>
                ${Number(precioFinal).toFixed(2)}
              </Typography>
              {enOferta && (
                <>
                  <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${Number(card.precio).toFixed(2)}
                  </Typography>
                  <Chip label={`-${descuento}%`} color="error" size="small" sx={{ fontWeight: 700 }} />
                </>
              )}
            </Stack>
            {market && market.priceUsd != null && (
              <Stack spacing={0.75} sx={{ mt: 1.5 }}>
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  label={`Precio de mercado $${Number(market.priceUsd).toFixed(2)} USD`}
                  sx={{ fontWeight: 700, alignSelf: 'flex-start' }}
                />
                {(() => {
                  const delta = ((Number(precioFinal) - market.priceUsd) / market.priceUsd) * 100;
                  const abs = Math.abs(delta);
                  if (abs < 2) {
                    return (
                      <Typography variant="caption" color="text.secondary">
                        Esta publicación está en línea con el mercado.
                      </Typography>
                    );
                  }
                  return (
                    <Typography variant="caption" sx={{ fontWeight: 600 }} color={delta > 0 ? 'warning.main' : 'success.main'}>
                      {abs.toFixed(0)}% {delta > 0 ? 'sobre' : 'bajo'} el precio de mercado ({market.source})
                    </Typography>
                  );
                })()}
              </Stack>
            )}
            <Typography variant="body2" color={stock > 0 ? 'success.main' : 'error.main'} sx={{ mt: 0.5, fontWeight: 600 }}>
              {stock > 0 ? `Stock: ${stock} disponible${stock > 1 ? 's' : ''}` : 'Sin stock'}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2.5 }}>
              <Button variant="contained" startIcon={<CartIcon />} onClick={onAddCart} disabled={stock <= 0} fullWidth>
                Agregar al carrito
              </Button>
              <Button variant="outlined" startIcon={<BuyIcon />} onClick={onBuyNow} disabled={stock <= 0} fullWidth>
                Comprar ahora
              </Button>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 1.5 }}>
              <Button
                variant={esFavorito ? 'contained' : 'text'}
                color={esFavorito ? 'error' : 'inherit'}
                startIcon={<FavoriteIcon />}
                onClick={() => addToFavorites(card.id, card.nombre)}
                fullWidth
              >
                {esFavorito ? 'En favoritos' : 'Agregar a favoritos'}
              </Button>
              <Button
                variant={enComparacion ? 'contained' : 'text'}
                startIcon={<CompareIcon />}
                onClick={() => toggleCompare(card)}
                fullWidth
              >
                {enComparacion ? 'En comparación' : 'Comparar'}
              </Button>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<CollectionIcon />}
                onClick={() => { if (exigirSesion('agregar a tu colección')) setCollectionOpen(true); }}
                fullWidth
              >
                Agregar a mi colección
              </Button>
              <Button
                variant="outlined"
                startIcon={<AlertIcon />}
                onClick={() => { if (exigirSesion('crear alertas de precio')) setAlertOpen(true); }}
                fullWidth
              >
                Alerta de precio
              </Button>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<ChatIcon />}
                onClick={onContactar}
                fullWidth
              >
                Contactar vendedor
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={() => setShareOpen(true)}
                fullWidth
              >
                Compartir
              </Button>
            </Stack>
            <Button
              variant="text"
              color="error"
              startIcon={<FlagIcon />}
              onClick={onReport}
              sx={{ mt: 1.5 }}
              fullWidth
            >
              Reportar publicación
            </Button>
          </Paper>

          {/* Vendedor */}
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, mt: 2.5 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>Vendedor</Typography>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
              <Box sx={{
                width: 48, height: 48, borderRadius: '50%', bgcolor: 'primary.light',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <StoreIcon color="primary" />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>{seller?.nombre || seller?.username || 'Cargando…'}</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Rating value={Number(seller?.rating || 0)} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {Number(seller?.rating || 0).toFixed(1)} ({seller?.ventas ?? 0} ventas)
                  </Typography>
                </Stack>
                {seller?.fechaCreacion && (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <DateIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      Miembro desde {new Date(seller.fechaCreacion).getFullYear()}
                    </Typography>
                  </Stack>
                )}
              </Box>
              {seller && (
                <Button component={Link} to={`/seller/${seller.username}`} size="small" variant="outlined">
                  Ver perfil
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* Descripción */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>Descripción</Typography>
            <Typography sx={{ mt: 1, lineHeight: 1.75 }}>
              {card.descripcion || 'El vendedor no agregó una descripción para esta carta.'}
            </Typography>
            {card.fechaPublicacion && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                Publicada el {new Date(card.fechaPublicacion).toLocaleDateString('es')}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        cardId={card.id}
        cardNombre={card.nombre}
      />
      <AddToCollectionDialog
        open={collectionOpen}
        onClose={() => setCollectionOpen(false)}
        card={card}
      />
      <PriceAlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        card={card}
      />

      {/* US-43: compartir en redes */}
      <Dialog open={shareOpen} onClose={() => setShareOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Compartir publicación</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {card.nombre}
          </Typography>
          <Stack spacing={1}>
            {enlaces.map((l) => (
              <Button key={l.label} variant="outlined" href={l.href} target="_blank" rel="noopener noreferrer"
                sx={{ justifyContent: 'flex-start' }}>
                {l.label}
              </Button>
            ))}
            <Button variant="contained" startIcon={copiado ? <CheckIcon /> : <LinkIcon />} onClick={copiarEnlace}>
              {copiado ? '¡Enlace copiado!' : 'Copiar enlace'}
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5, wordBreak: 'break-all' }}>
            {url}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
