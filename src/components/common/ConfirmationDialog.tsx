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

const ConfirmationDialog = (props: ConfirmationDialogProps & DialogProps) => (
    <CommonDialog ariaLabelledBy="confirmation-dialog-title" {...props}>
        <Stack spacing={8}>
            <Typography variant="body1">{props.message}</Typography>

            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
                    onClick={props.onConfirm}
                >
                    {props.primaryActionText}
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Stack>
    </CommonDialog>
);

export default ConfirmationDialog;
