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
                paddingBlock: '2rem',
                paddingInline: '3.2rem',
                borderRadius: '.8rem',
            },
        },
    },
    MuiLink: {
        styleOverrides: {
            root: {
                color: '#212121',
                '&:hover': {
                    color: '#313131',
                },
            },
        },
    },
};
