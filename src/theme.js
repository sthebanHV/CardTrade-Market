import { createTheme } from '@mui/material/styles';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6', dark: '#1E40AF', light: '#93C5FD', contrastText: '#FFFFFF' },
    secondary: { main: '#1E40AF', dark: '#172554', light: '#BFDBFE' },
    success: { main: '#10B981', dark: '#047857', light: '#D1FAE5' },
    warning: { main: '#F59E0B', dark: '#B45309', light: '#FEF3C7' },
    error: { main: '#EF4444', dark: '#B91C1C', light: '#FEE2E2' },
    background: { default: '#F5F7FB', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B' },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: 'Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    h3: { fontWeight: 800, letterSpacing: '-0.03em' },
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)',
    '0 1px 2px rgba(15,23,42,0.04), 0 2px 6px rgba(15,23,42,0.06)',
    '0 2px 4px rgba(15,23,42,0.05), 0 6px 16px rgba(15,23,42,0.08)',
    '0 4px 8px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.10)',
    '0 8px 16px rgba(15,23,42,0.08), 0 20px 40px rgba(15,23,42,0.12)',
    '0 12px 24px rgba(15,23,42,0.10), 0 28px 56px rgba(15,23,42,0.14)',
    '0 16px 32px rgba(15,23,42,0.12), 0 36px 72px rgba(15,23,42,0.16)',
    ...Array(15).fill('0 16px 32px rgba(15,23,42,0.12), 0 36px 72px rgba(15,23,42,0.16)'),
  ],
  transitions: {
    duration: { shortest: 120, shorter: 160, short: 220, standard: 280, complex: 420 },
    easing: { easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', easeOut: 'cubic-bezier(0, 0, 0.2, 1)' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Barra de scrollbar moderna y delgada.
        '::-webkit-scrollbar': { width: 10, height: 10 },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': {
          background: '#CBD5E1',
          borderRadius: 999,
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
        },
        '::-webkit-scrollbar-thumb:hover': { background: '#94A3B8', backgroundClip: 'padding-box' },
        '::selection': { background: 'rgba(59,130,246,0.22)' },
        body: {
          backgroundImage:
            'radial-gradient(1200px 600px at 10% -10%, rgba(59,130,246,0.10), transparent 60%),' +
            'radial-gradient(900px 500px at 100% 0%, rgba(30,64,175,0.08), transparent 55%)',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          position: 'relative',
          overflow: 'hidden',
          transition: `transform ${200}ms ${EASE}, box-shadow 220ms ${EASE}, background-color 200ms ease, border-color 200ms ease, opacity 200ms ease`,
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0) scale(0.98)' },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 6px 20px rgba(59,130,246,0.35)' },
          // Brillo que cruza el botón al pasar el mouse.
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)',
            transform: 'translateX(-120%)',
            transition: 'transform .6s ease',
          },
          '&:hover::after': { transform: 'translateX(120%)' },
        },
        outlined: { '&:hover': { borderWidth: '2px', backgroundColor: 'rgba(59,130,246,0.06)' } },
        text: { '&:hover': { backgroundColor: 'rgba(59,130,246,0.08)' } },
        sizeLarge: { paddingInline: 32, py: 1.1, fontSize: 16 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `transform 180ms ${EASE}, background-color 180ms ease`,
          '&:hover': { transform: 'scale(1.08)' },
          '&:active': { transform: 'scale(0.94)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid rgba(226,232,240,0.9)',
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,1))',
          boxShadow: '0 1px 3px rgba(15,23,42,0.05), 0 8px 24px rgba(15,23,42,0.05)',
          transition: `transform ${260}ms ${EASE}, box-shadow 260ms ${EASE}, border-color 260ms ease`,
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 8px 16px rgba(15,23,42,0.08), 0 28px 56px rgba(15,23,42,0.14)',
            borderColor: 'rgba(59,130,246,0.35)',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: { root: { transition: 'transform .5s cubic-bezier(0.22,1,0.36,1)' } },
    },
    MuiPaper: {
      styleOverrides: {
        root: { transition: 'box-shadow .25s ease, transform .25s ease, border-color .25s ease' },
        elevation0: { backgroundImage: 'none' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 24, animation: `dialogIn .3s ${EASE}` },
      },
    },
    MuiBackdrop: {
      styleOverrides: { root: { backgroundColor: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' } },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'box-shadow .2s ease, border-color .2s ease, background-color .2s ease',
            '&:hover': { backgroundColor: 'rgba(148,163,184,0.06)' },
            '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(59,130,246,0.16)' },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #172554 0%, #1E40AF 45%, #3B82F6 100%)',
          backgroundSize: '200% 100%',
          animation: 'appbarShift 18s ease-in-out infinite alternate',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, transition: `transform 180ms ${EASE}, box-shadow 180ms ease` },
        outlined: { backgroundColor: 'rgba(255,255,255,0.75)' },
        avatar: { transition: 'transform .3s ease' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { borderRadius: 8, margin: '2px 6px', transition: 'background-color .16s ease, transform .16s ease' },
      },
    },
    MuiList: { styleOverrides: { root: { padding: 8 } } },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          animation: 'badgePop .35s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: '0 2px 6px rgba(15,23,42,0.25)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 8, fontSize: 12, fontWeight: 600, animation: 'fadeIn .16s ease' },
      },
    },
    MuiSnackbar: { styleOverrides: { root: { animation: 'slideUp .3s cubic-bezier(0.22,1,0.36,1)' } } },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 14, fontWeight: 500, animation: 'fadeIn .3s ease' },
        standardWarning: { backgroundImage: 'linear-gradient(90deg, rgba(245,158,11,0.12), rgba(245,158,11,0.03))' },
        standardInfo: { backgroundImage: 'linear-gradient(90deg, rgba(59,130,246,0.12), rgba(59,130,246,0.03))' },
        standardSuccess: { backgroundImage: 'linear-gradient(90deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))' },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: { borderRadius: 12 },
        rectangular: { borderRadius: 16 },
      },
    },
    MuiTable: { styleOverrides: { root: { backgroundColor: 'transparent' } } },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, color: '#475569', letterSpacing: '.02em', textTransform: 'uppercase', fontSize: 12 },
      },
    },
    MuiPagination: {
      styleOverrides: { root: { '& .MuiPaginationItem-root': { transition: 'all .2s ease' } } },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
          '&::before': { display: 'none' },
          '&.Mui-expanded': { animation: 'fadeIn .3s ease' },
        },
      },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600, transition: 'all .2s ease' } },
    },
    MuiFab: {
      styleOverrides: {
        root: { transition: `transform 220ms ${EASE}, box-shadow 220ms ease` },
        extended: { fontWeight: 700 },
      },
    },
  },
});

// ── Motion global: keyframes + utilidades reutilizables ──────────────────────
const style = typeof document !== 'undefined' ? document.createElement('style') : null;
if (style) {
  style.textContent = `
  @keyframes pageIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes dialogIn { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes pulseSoft { 0%,100% { opacity: .65; } 50% { opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes badgePop { 0% { transform: scale(.4); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
  @keyframes appbarShift { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  @keyframes heroGlow {
    0% { transform: translate3d(0,0,0) scale(1); opacity: .55; }
    50% { transform: translate3d(4%, -3%, 0) scale(1.08); opacity: .8; }
    100% { transform: translate3d(0,0,0) scale(1); opacity: .55; }
  }
  @keyframes borderFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Scroll-reveal: los elementos empiezan invisibles y ctm-in los revela. */
  .ctm-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ${EASE}, transform .6s ${EASE}; will-change: opacity, transform; }
  .ctm-reveal.ctm-in { opacity: 1; transform: translateY(0); }

  /* Stagger: aplica fadeUp escalonado a los hijos directos de un contenedor. */
  .ctm-stagger > * { animation: fadeUp .55s ${EASE} both; }
  .ctm-stagger > *:nth-child(1) { animation-delay: .04s; }
  .ctm-stagger > *:nth-child(2) { animation-delay: .10s; }
  .ctm-stagger > *:nth-child(3) { animation-delay: .16s; }
  .ctm-stagger > *:nth-child(4) { animation-delay: .22s; }
  .ctm-stagger > *:nth-child(5) { animation-delay: .28s; }
  .ctm-stagger > *:nth-child(6) { animation-delay: .34s; }
  .ctm-stagger > *:nth-child(7) { animation-delay: .40s; }
  .ctm-stagger > *:nth-child(8) { animation-delay: .46s; }
  .ctm-stagger > *:nth-child(n+9) { animation-delay: .52s; }

  /* Skeleton con brillo de carga. */
  .ctm-skeleton {
    background: linear-gradient(90deg, #EEF2F7 25%, #F8FAFC 37%, #EEF2F7 63%);
    background-size: 600px 100%;
    animation: shimmer 1.4s linear infinite;
  }

  /* Flotación suave (decorativa). */
  .ctm-float { animation: floatY 5s ease-in-out infinite; }

  /* Anillo con gradiente animado para CTAs / badges. */
  .ctm-ring {
    position: relative;
    background: linear-gradient(#fff, #fff) padding-box,
                linear-gradient(120deg, #3B82F6, #93C5FD, #1E40AF, #3B82F6) border-box;
    background-size: 100% 100%, 300% 300%;
    border: 2px solid transparent;
    animation: borderFlow 6s ease infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: .01ms !important;
    }
    .ctm-reveal { opacity: 1; transform: none; }
  }
`;
}
if (style && !document.getElementById('cardtrade-motion')) {
  style.id = 'cardtrade-motion';
  document.head.appendChild(style);
}
