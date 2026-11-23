import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

/**
 * Scroll-reveal sin dependencias: aplica `ctm-reveal` y, cuando el elemento
 * entra en pantalla, añade `ctm-in` para disparar la transición del theme.
 * Respeta `prefers-reduced-motion` vía las reglas globales del theme.
 */
export const Reveal = ({ children, delay = 0, sx, ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className={`ctm-reveal${visible ? ' ctm-in' : ''}`}
      sx={{ transitionDelay: `${delay}ms`, ...sx }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;
