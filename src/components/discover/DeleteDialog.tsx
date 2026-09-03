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

import PopupDialog from '@components/common/PopupDialog';
import { RestaurantType } from '@schemas/restaurants.schema';
interface DeleteDialogProps {
    open: boolean;
    restaurant: RestaurantType | null;
    onConfirmation: (restaurant: RestaurantType) => void;
    onClose: () => void;
}

const DeleteDialog = ({
    open,
    restaurant,
    onConfirmation,
    onClose,
}: DeleteDialogProps) => (
    <PopupDialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="delete-restaurant-dialog"
    >
        <DialogTitle variant="h4" component="h2" id="delete-restaurant-dialog">
            Deletion Confirmation
        </DialogTitle>
        <DialogContent>
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <Close />
            </IconButton>
            <Stack spacing={8}>
                <Typography variant="body1">
                    Are you sure you want to delete this item?
                </Typography>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            if (restaurant) onConfirmation(restaurant);
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
