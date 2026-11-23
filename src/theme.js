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
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'box-shadow .22s ease, transform .22s ease, border-color .22s ease',
        },
      },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 20, animation: 'dialogIn .28s ease-out' } },
    },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)' },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
  },
  transitions: { duration: { shortest: 120, shorter: 160, short: 220, standard: 280, complex: 420 } },
});

// Global motion primitives keep the interface lively while remaining opt-out friendly.
const style = typeof document !== 'undefined' ? document.createElement('style') : null;
if (style) style.textContent = `
  @keyframes pageIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes dialogIn { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes pulseSoft { 0%,100% { opacity: .65; } 50% { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; } }
`;
if (style && !document.getElementById('cardtrade-motion')) { style.id = 'cardtrade-motion'; document.head.appendChild(style); }
