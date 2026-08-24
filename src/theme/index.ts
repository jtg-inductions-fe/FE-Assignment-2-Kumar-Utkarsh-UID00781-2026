import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { SCALING_FACTOR } from '@constant';

/* Customized MUI components themes */
import { components } from './components';
/* Customized foundation themes */
import { breakpoints, mixins, palette, typography } from './foundations';

/* 
Initialize the theme with base theme elements (excluding typography styles and spacing to ensure the theme has correct breakpoints and pxToRem function set.)
*/
let theme = createTheme({
    palette,
    breakpoints,
    mixins,
    components,
    typography: {
        ...typography.typographyStyle(),
        fontFamily: 'Roboto',
        ...typography.typographyUtil,
    },
    spacing: (factor: number) =>
        typography.typographyUtil.pxToRem(factor * SCALING_FACTOR),
});

theme = responsiveFontSizes(theme);

export { theme };
