import { Close } from '@mui/icons-material';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import PopupDialog from '@components/common/PopupDialog';
import { RestaurantType } from '@schemas/restaurants.schema';

import RestaurantForm from './RestaurantForm';

interface RestaurantDialogProps {
    open: boolean;
    mode: 'add' | 'edit';
    restaurant?: RestaurantType;
    onClose: () => void;
}

const DialogCornerButton = styled(IconButton)({
    position: 'absolute',
    top: 8,
    right: 8,
});

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
            <DialogCornerButton
                aria-label={`Close ${mode} restaurant dialog`}
                onClick={onClose}
            >
                <Close />
            </DialogCornerButton>
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
