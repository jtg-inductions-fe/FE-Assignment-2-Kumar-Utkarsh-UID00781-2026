import { Dialog, DialogProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const PopupDialog = styled(Dialog)<DialogProps>(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 20,
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8),
        },
    },
}));

export default PopupDialog;
