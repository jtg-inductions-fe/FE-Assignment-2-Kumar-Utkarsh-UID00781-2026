import ConfirmationDialog from '@components/common/ConfirmationDialog';
import { FoodItemType } from '@components/restaurant/foodItem.schema';
interface DeleteDialogProps {
    open: boolean;
    foodItem: FoodItemType | null;
    onConfirmation: (foodItem: FoodItemType) => void;
    onClose: () => void;
}

const DeleteDialog = ({
    open,
    foodItem,
    onConfirmation,
    onClose,
}: DeleteDialogProps) => (
    <ConfirmationDialog
        open={open}
        onClose={onClose}
        onConfirm={() => {
            if (foodItem) onConfirmation(foodItem);
        }}
        title="Delete food item?"
        primaryActionText="Delete"
        message="Are you sure you want to delete this food item? This action cannot be reversed."
        fullWidth
        maxWidth="md"
    />
);

export default DeleteDialog;
