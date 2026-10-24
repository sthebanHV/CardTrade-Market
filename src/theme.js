import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6', dark: '#1E40AF', light: '#93C5FD', contrastText: '#FFFFFF' },
    secondary: { main: '#1E40AF', dark: '#172554', light: '#BFDBFE' },
    success: { main: '#10B981', dark: '#047857', light: '#D1FAE5' },
    warning: { main: '#F59E0B', dark: '#B45309', light: '#FEF3C7' },
    error: { main: '#EF4444', dark: '#B91C1C', light: '#FEE2E2' },
    background: { default: '#F3F4F6', paper: '#FFFFFF' },
    text: { primary: '#111827', secondary: '#6B7280' },
    divider: '#D1D5DB',
  },
  typography: {
    fontFamily: 'Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18 },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 4px 14px rgba(59,130,246,0.35)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(17,24,39,0.06), 0 8px 24px rgba(17,24,39,0.05)',
          transition: 'transform .18s ease, box-shadow .18s ease',
          '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 12px rgba(17,24,39,0.08), 0 16px 32px rgba(17,24,39,0.10)' },
        },
      },
    },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)' },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
  },
});
