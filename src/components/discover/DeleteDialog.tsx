import ConfirmationDialog from '@components/common/ConfirmationDialog';
import { RestaurantType } from '@components/restaurant/restaurants.schema';
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
    <ConfirmationDialog
        open={open}
        onClose={onClose}
        onConfirm={() => {
            if (restaurant) onConfirmation(restaurant);
        }}
        title="Delete Restaurant?"
        message="Are you sure you want to delete this restaurant? This action cannot be reversed."
        primaryActionText="Delete"
        fullWidth
        maxWidth="md"
        aria-labelledby="delete-restaurant-dialog"
    />
);

export default DeleteDialog;
