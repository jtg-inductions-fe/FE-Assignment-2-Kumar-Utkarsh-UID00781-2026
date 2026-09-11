import { ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import {
    Dialog,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface CommonDialogProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    ariaLabelledBy: string;
}

const DialogCornerButton = styled(IconButton)({
    position: 'absolute',
    top: 8,
    right: 8,
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 20,
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
    },
}));

const CommonDialog = (props: CommonDialogProps & DialogProps) => (
    <StyledDialog
        fullWidth
        maxWidth="md"
        aria-labelledby={props.ariaLabelledBy}
        {...props}
    >
        <DialogTitle variant="h4" component="h2" id={props.ariaLabelledBy}>
            {props.title}
        </DialogTitle>

        <DialogCornerButton aria-label="Close dialog" onClick={props.onClose}>
            <Close />
        </DialogCornerButton>

        <DialogContent>{props.children}</DialogContent>
    </StyledDialog>
);

export default CommonDialog;
