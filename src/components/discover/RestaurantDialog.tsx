import { Close } from '@mui/icons-material';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';

import PopupDialog from '@components/common/PopupDialog';
import { RestaurantType } from '@schemas/restaurants.schema';

import RestaurantForm from './RestaurantForm';

interface RestaurantDialogProps {
    open: boolean;
    mode: 'add' | 'edit';
    restaurant?: RestaurantType;
    onClose: () => void;
}

const RestaurantDialog = ({
    open,
    mode,
    restaurant,
    onClose,
}: RestaurantDialogProps) => (
    <PopupDialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="add-edit-dialog-title"
    >
        <DialogTitle variant="h4" component="h2" id="add-edit-dialog-title">
            {mode === 'add' ? 'Add Restaurant' : 'Edit Restaurant'}
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
            <RestaurantForm
                mode={mode}
                restaurant={restaurant}
                onSuccess={onClose}
                onCancel={onClose}
            />
        </DialogContent>
    </PopupDialog>
);

export default RestaurantDialog;
