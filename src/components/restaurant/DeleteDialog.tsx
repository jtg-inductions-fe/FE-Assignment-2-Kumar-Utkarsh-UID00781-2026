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
import { FoodItemType } from '@schemas/restaurants.schema';
interface DeleteDialogProps {
    open: boolean;
    foodItem: FoodItemType | null;
    onConfirmation: (foodItem: FoodItemType) => void;
    onClose: () => void;
}

const DialogCornerButton = styled(IconButton)({
    position: 'absolute',
    top: 8,
    right: 8,
});

const DeleteDialog = ({
    open,
    foodItem,
    onConfirmation,
    onClose,
}: DeleteDialogProps) => (
    <PopupDialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="delete-food-item-dialog-title"
    >
        <DialogTitle variant="h4" id="delete-food-item-dialog-title">
            Deletion Confirmation
        </DialogTitle>
        <DialogContent>
            <DialogCornerButton
                onClick={onClose}
                aria-label="Close delete food item dialog"
            >
                <Close />
            </DialogCornerButton>
            <Stack spacing={8}>
                <Typography variant="body1">
                    Are you sure you want to delete this item?
                </Typography>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            if (foodItem) onConfirmation(foodItem);
                        }}
                    >
                        Delete
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

export default DeleteDialog;
