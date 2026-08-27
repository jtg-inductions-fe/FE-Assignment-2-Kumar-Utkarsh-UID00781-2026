import type { Components } from '@mui/material/styles';

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                paddingBlock: '1rem',
                paddingInline: '2rem',
                borderRadius: '1rem',
            },
        },
    },
};
