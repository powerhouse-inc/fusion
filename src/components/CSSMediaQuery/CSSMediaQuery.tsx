import { styled } from '@mui/material';
import React from 'react';
import type { breakpoints } from '@ses/styles/theme/themes';

interface CSSMediaQueryProps extends React.PropsWithChildren {
  min?: number | keyof typeof breakpoints;
  max?: number | keyof typeof breakpoints;
  display?: React.CSSProperties['display'];
  as?: React.ElementType;
}

const CSSMediaQuery: React.FC<CSSMediaQueryProps> = ({ children, min, max, display = 'block', as = 'div' }) => (
  <MediaQuery as={as} display={display} min={min} max={max}>
    {children}
  </MediaQuery>
);

export default CSSMediaQuery;

const MediaQuery = styled('div')<CSSMediaQueryProps>(({ theme, min, max, display }) => ({
  // no min or max
  ...(!min &&
    !max && {
      display,
    }),

  // min but not max
  ...(min &&
    !max && {
      [theme.breakpoints.up(min)]: {
        display,
      },
      [theme.breakpoints.down(min)]: {
        display: 'none',
      },
    }),

  // max but not min
  ...(max &&
    !min && {
      [theme.breakpoints.down(max)]: {
        display,
      },

      [theme.breakpoints.up(max)]: {
        display: 'none',
      },
    }),

  // min and max
  ...(min &&
    max && {
      [theme.breakpoints.between(min, max)]: {
        display,
      },

      [theme.breakpoints.up(max)]: {
        display: 'none',
      },

      [theme.breakpoints.down(min)]: {
        display: 'none',
      },
    }),
}));
