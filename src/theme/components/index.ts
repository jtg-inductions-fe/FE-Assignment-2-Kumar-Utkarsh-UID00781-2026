import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
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
                paddingInline: '2rem',
                borderRadius: '.8rem',
            },
        },
    },
    MuiLink: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: theme.palette.secondary.main,
                '&:hover': {
                    color: theme.palette.secondary.light,
                },
            }),
        },
    },
};
