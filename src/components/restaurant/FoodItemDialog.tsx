import CommonDialog from '@components/common/CommonDialog';
import { FoodItemType } from '@components/restaurant/foodItem.schema';
import FoodItemForm from '@containers/FoodItemForm';

interface RestaurantDialogProps {
    open: boolean;
    mode: 'add' | 'edit';
    foodItem?: FoodItemType;
    onClose: () => void;
}

const FoodItemDialog = ({
    open,
    mode,
    foodItem,
    onClose,
}: RestaurantDialogProps) => (
    <CommonDialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        title={mode === 'add' ? 'Add Food Item' : 'Edit Food Item'}
        ariaLabelledBy="food-item-dialog-title"
    >
        <FoodItemForm
            mode={mode}
            foodItem={foodItem}
            onSuccess={onClose}
            onCancel={onClose}
        />
    </CommonDialog>
);

export default FoodItemDialog;
