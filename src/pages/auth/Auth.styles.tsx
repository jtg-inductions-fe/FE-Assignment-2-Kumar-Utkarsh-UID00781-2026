import { Box, BoxProps, Paper, PaperProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const FormPaper = styled(Paper)<PaperProps>(({ theme }) => ({
    width: '100%',
    maxWidth: 600,
    padding: theme.spacing(6),
    marginInline: theme.spacing(6),
    marginBlock: 32,
    borderRadius: 20,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
        marginInline: theme.spacing(8),
    },
}));

const StyledAuthContainer = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100dvh',
    backgroundColor: grey[200],
}));

export { FormPaper, StyledAuthContainer };
