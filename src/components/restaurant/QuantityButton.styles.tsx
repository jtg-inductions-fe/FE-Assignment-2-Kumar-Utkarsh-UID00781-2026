import { Button, ButtonProps, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const QuantityField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    height: '100%',
    '&.MuiTextField-root': {
        padding: 0,
    },
    '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 0,
        width: 40,
    },
    '& .MuiOutlinedInput-input': {
        ...theme.typography.body1,
        fontWeight: 700,
        paddingBlock: theme.spacing(3.4),
        paddingInline: 0,
        textAlign: 'center',
    },
}));

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: 40,
    padding: theme.spacing(3),
}));
