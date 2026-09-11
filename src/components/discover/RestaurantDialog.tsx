import CommonDialog from '@components/common/CommonDialog';
import { RestaurantType } from '@components/restaurant/restaurants.schema';
import RestaurantForm from '@containers/RestaurantForm';

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
    <CommonDialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        title={mode === 'add' ? 'Add Restaurant' : 'Edit Restaurant'}
        ariaLabelledBy="add-edit-dialog-title"
    >
        <RestaurantForm
            mode={mode}
            restaurant={restaurant}
            onSuccess={onClose}
            onCancel={onClose}
        />
    </CommonDialog>
);

export default RestaurantDialog;
