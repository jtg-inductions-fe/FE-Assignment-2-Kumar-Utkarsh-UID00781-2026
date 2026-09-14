import {
    Button,
    DialogActions,
    DialogProps,
    Stack,
    Typography,
} from '@mui/material';

import CommonDialog from '@components/common/CommonDialog';
interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    primaryActionText: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmationDialog = ({
    open,
    title,
    message,
    primaryActionText,
    onConfirm,
    onClose,
    ...rest
}: ConfirmationDialogProps & DialogProps) => (
    <CommonDialog
        ariaLabelledBy="confirmation-dialog-title"
        open={open}
        title={title}
        onClose={onClose}
        {...rest}
    >
        <Stack spacing={8}>
            <Typography variant="body1">{message}</Typography>

            <DialogActions>
                <Button variant="contained" color="error" onClick={onConfirm}>
                    {primaryActionText}
                </Button>

                <Button variant="contained" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Stack>
    </CommonDialog>
);

export default ConfirmationDialog;
