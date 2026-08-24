import { Paper, PaperProps } from '@mui/material';
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

export default FormPaper;
