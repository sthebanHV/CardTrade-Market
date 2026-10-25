import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Menu, MenuItem,
  ListItemIcon, ListItemText, Divider, Avatar, Tooltip, InputBase, alpha, Chip,
  Autocomplete, TextField, InputAdornment, CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon, ShoppingCart as CartIcon, Notifications as BellIcon,
  Person as PersonIcon, Logout as LogoutIcon, Dashboard as DashboardIcon,
  Sell as SellIcon, Favorite as FavoriteIcon, CollectionsBookmark as CollectionIcon,
  AdminPanelSettings as AdminIcon, Settings as SettingsIcon, Chat as ChatIcon,
  Storefront as StoreIcon, LocalOffer as OfferIcon, History as HistoryIcon,
  ReceiptLong as PurchasesIcon, SellTwoTone as ListIcon, AccountCircle,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material';
import { useStore } from '../../store';
import { cardsAPI } from '../../api/apiClient';

const perspectivas = [
  {
    label: 'Explorar',
    items: [
      { to: '/cards', text: 'Catálogo', icon: <StoreIcon fontSize="small" /> },
      { to: '/market', text: 'Precios de mercado', icon: <QueryStatsIcon fontSize="small" /> },
      { to: '/offers', text: 'Ofertas', icon: <OfferIcon fontSize="small" /> },
      { to: '/games', text: 'Por juego', icon: <CollectionIcon fontSize="small" /> },
    ],
  },
  {
    label: 'Comprar',
    items: [
      { to: '/cart', text: 'Carrito', icon: <CartIcon fontSize="small" /> },
      { to: '/my-purchases', text: 'Mis compras', icon: <PurchasesIcon fontSize="small" /> },
    ],
  },
  {
    label: 'Vender',
    items: [
      { to: '/sell/new', text: 'Publicar carta', icon: <SellIcon fontSize="small" /> },
      { to: '/my-listings', text: 'Mis publicaciones', icon: <ListIcon fontSize="small" /> },
      { to: '/my-sales', text: 'Mis ventas', icon: <HistoryIcon fontSize="small" /> },
    ],
  },
  {
    label: 'Colección',
    items: [
      { to: '/my-collection', text: 'Mi colección', icon: <CollectionIcon fontSize="small" /> },
      { to: '/favorites', text: 'Favoritos', icon: <FavoriteIcon fontSize="small" /> },
      { to: '/my-alerts', text: 'Alertas de precio', icon: <BellIcon fontSize="small" /> },
      { to: '/wishlist', text: 'Lista de deseos', icon: <OfferIcon fontSize="small" /> },
    ],
  },
];

export const Header = () => {
  const { token, user, cart, logout, unread, refreshUnread } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSug, setLoadingSug] = useState(false);
  const debounceRef = useRef(null);

  // US-45: badge de no leídas (notificaciones + mensajes)
  useEffect(() => {
    if (!token) return;
    refreshUnread();
    const t = setInterval(() => refreshUnread(), 60000);
    return () => clearInterval(t);
  }, [token, refreshUnread]);

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const openUser = (e) => setUserAnchor(e.currentTarget);
  const closeUser = () => setUserAnchor(null);

  const fetchSuggestions = (text) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text || text.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setLoadingSug(true);
    debounceRef.current = setTimeout(() => {
      cardsAPI.suggestions(text.trim())
        .then((data) => setSuggestions(data || []))
        .catch(() => setSuggestions([]))
        .finally(() => setLoadingSug(false));
    }, 300);
  };

  const goSearch = (text) => {
    const term = (text ?? q).trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleLogout = () => {
    closeUser();
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 1.5, px: { xs: 1.5, md: 3 } }}>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box component="span" sx={{ fontSize: 22 }}>🃏</Box>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>CardTrade Market</Box>
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => { e.preventDefault(); goSearch(); }}
          sx={{
            ml: { xs: 0, md: 1 }, flexGrow: { xs: 1, md: 0 }, width: { md: 340 },
            display: 'flex', alignItems: 'center',
          }}
        >
          <Autocomplete
            freeSolo
            options={suggestions}
            value={q}
            onValueChange={(e, v) => setQ(v || '')}
            onInputChange={(e, v, reason) => {
              if (reason === 'input') fetchSuggestions(v);
              if (reason === 'clear') setSuggestions([]);
            }}
            onChange={(e, v) => { if (v) goSearch(v); }}
            loading={loadingSug}
            sx={{ width: '100%' }}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option}>
                <SearchIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                {option}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Buscar cartas…"
                aria-label="Buscar cartas"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.18)',
                    borderRadius: '999px',
                    height: 38,
                    color: '#fff',
                    pr: 1,
                    fieldset: { borderColor: 'rgba(255,255,255,0.25)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#fff' },
                  },
                  '& .MuiInputBase-input': { color: '#fff', fontSize: 14 },
                  '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.85)', opacity: 1 },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#fff', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {loadingSug && <CircularProgress size={16} sx={{ color: '#fff' }} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5, ml: 'auto', alignItems: 'center' }}>
          {perspectivas.map((p) => (
            <Button key={p.label} color="inherit" onClick={openMenu} data-menu={p.label}
              sx={{ color: '#fff', opacity: 0.95, '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
              {p.label} ▾
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: { xs: 'auto', lg: 0 } }}>
          <IconButton color="inherit" component={Link} to="/cart" aria-label="Carrito"
            sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
            <Badge badgeContent={cart.length} color="secondary" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
              <CartIcon />
            </Badge>
          </IconButton>

          {token && (
            <IconButton color="inherit" component={Link} to="/notifications" aria-label="Notificaciones"
              sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
              <Badge badgeContent={unread} color="warning" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
                <BellIcon />
              </Badge>
            </IconButton>
          )}

          {token ? (
            <>
              <Tooltip title={user?.username || 'Mi cuenta'}>
                <IconButton onClick={openUser} aria-label="Menú de usuario" sx={{ ml: 0.5 }}>
                  <Avatar sx={{ width: 34, height: 34, bgcolor: '#F59E0B', fontSize: 15, fontWeight: 700 }}>
                    {(user?.nombre || user?.username || 'U').charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu anchorEl={userAnchor} open={Boolean(userAnchor)} onClose={closeUser}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2">{user?.nombre || user?.username}</Typography>
                  <Chip size="small" label={user?.role === 'ROLE_ADMIN' ? 'Administrador' : 'Usuario'}
                    color={user?.role === 'ROLE_ADMIN' ? 'error' : 'primary'} variant="outlined" sx={{ mt: 0.5 }} />
                </Box>
                <Divider />
                <MenuItem component={Link} to="/profile" onClick={closeUser}>
                  <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon><ListItemText>Mi perfil</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/settings" onClick={closeUser}>
                  <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon><ListItemText>Configuración</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/messages" onClick={closeUser}>
                  <ListItemIcon><ChatIcon fontSize="small" /></ListItemIcon><ListItemText>Mensajes</ListItemText>
                </MenuItem>
                <MenuItem component={Link} to="/dashboard" onClick={closeUser}>
                  <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon><ListItemText>Dashboard</ListItemText>
                </MenuItem>
                {user?.role === 'ROLE_ADMIN' && (
                  <MenuItem component={Link} to="/admin" onClick={closeUser}>
                    <ListItemIcon><AdminIcon fontSize="small" /></ListItemIcon>
                    <ListItemText><Typography color="error" sx={{ fontWeight: 600 }}>Administración</Typography></ListItemText>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon><ListItemText>Cerrar sesión</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
              <Button color="inherit" component={Link} to="/login"
                sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.5)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
                Iniciar sesión
              </Button>
              <Button component={Link} to="/register" variant="contained"
                sx={{ bgcolor: '#fff', color: 'primary.dark', '&:hover': { bgcolor: '#EFF6FF' } }}>
                Registrarse
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        {(perspectivas.find((p) => p.label === anchorEl?.dataset?.menu)?.items || []).map((item) => (
          <MenuItem key={item.to} component={Link} to={item.to} onClick={closeMenu}
            selected={location.pathname === item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};
