import { Close } from '@mui/icons-material';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import PopupDialog from '@components/common/PopupDialog';
import { FoodItemType } from '@schemas/restaurants.schema';

import FoodItemForm from './FoodItemForm';

interface RestaurantDialogProps {
    open: boolean;
    mode: 'add' | 'edit';
    foodItem?: FoodItemType;
    onClose: () => void;
}

const DialogCornerButton = styled(IconButton)({
    position: 'absolute',
    top: 8,
    right: 8,
});

const FoodItemDialog = ({
    open,
    mode,
    foodItem,
    onClose,
}: RestaurantDialogProps) => (
    <PopupDialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="food-item-dialog-title"
    >
        <DialogTitle variant="h4" component="h2" id="food-item-dialog-title">
            {mode === 'add' ? 'Add Food Item' : 'Edit Food Item'}
        </DialogTitle>
        <DialogContent>
            <DialogCornerButton onClick={onClose}>
                <Close />
            </DialogCornerButton>
            <FoodItemForm
                mode={mode}
                foodItem={foodItem}
                onSuccess={onClose}
                onCancel={onClose}
            />
        </DialogContent>
    </PopupDialog>
);

export default FoodItemDialog;
