import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Box)(({ theme }) => ({
    position: 'sticky',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
    },
}));

const HeaderLogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

const HeaderLogoImgWrapper = styled(Box)(({ theme }) => ({
    background: 'red',
    borderRadius: '100%',
    overflow: 'hidden',
    width: 40,
    aspectRatio: '1 / 1',
    [theme.breakpoints.up('md')]: {
        width: 48,
    },
    [theme.breakpoints.up('lg')]: {
        width: 56,
    },
}));

export { HeaderContainer, HeaderLogoContainer, HeaderLogoImgWrapper };
