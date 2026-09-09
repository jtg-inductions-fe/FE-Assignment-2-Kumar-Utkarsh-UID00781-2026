import { Close } from '@mui/icons-material';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import PopupDialog from '@components/common/PopupDialog';

type ReplaceCartDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirmation: () => void;
};

const DialogCornerButton = styled(IconButton)({
    position: 'absolute',
    top: 8,
    right: 8,
});

const ReplaceCartDialog = ({
    open,
    onClose,
    onConfirmation,
}: ReplaceCartDialogProps) => (
    <PopupDialog
        open={open}
        onClose={onClose}
        aria-labelledby="replace-cart-dialog-title"
        fullWidth
        maxWidth="md"
    >
        <DialogTitle id="replace-cart-dialog-title" variant="h4" component="h2">
            Replace your cart?
        </DialogTitle>

        <DialogContent>
            <DialogCornerButton
                aria-label="Close replace cart dialog"
                onClick={onClose}
            >
                <Close />
            </DialogCornerButton>
            <Stack spacing={8}>
                <Typography id="replace-cart-dialog-description">
                    Your cart contains items from another restaurant. Do you
                    want to clear your current cart and add this item instead?
                </Typography>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onConfirmation}
                    >
                        Replace
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Stack>
        </DialogContent>
    </PopupDialog>
);

export default ReplaceCartDialog;
