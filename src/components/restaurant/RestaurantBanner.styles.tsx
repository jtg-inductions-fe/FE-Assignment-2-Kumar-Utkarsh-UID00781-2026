import { Box, BoxProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: 32,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
}));

export const BannerImg = styled('img')(({ theme }) => ({
    borderRadius: 16,
    objectFit: 'cover',
    aspectRatio: '4 / 3',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '200px',
    },
    [theme.breakpoints.up('md')]: {
        width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
        width: '540px',
    },
}));

export const BannerContent = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

export const BannerTextContent = styled(Stack)(({ theme }) => ({
    paddingBlock: theme.spacing(4),
    gap: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        gap: theme.spacing(8),
    },
}));

export const BannerHeaderContainer = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),
}));
