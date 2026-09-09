import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerizedBox = styled(Box)<BoxProps>(({ theme }) => ({
    maxWidth: 1280,
    marginInline: 'auto',
    padding: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
    },
}));

export default ContainerizedBox;
