import ConfirmationDialog from '@components/common/ConfirmationDialog';

type ReplaceCartDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirmation: () => void;
};

const ReplaceCartDialog = ({
    open,
    onClose,
    onConfirmation,
}: ReplaceCartDialogProps) => (
    <ConfirmationDialog
        open={open}
        onClose={onClose}
        onConfirm={onConfirmation}
        aria-labelledby="replace-cart-dialog-title"
        title="Replace your cart?"
        message="Your cart contains items from another restaurant. Do you
                    want to clear your current cart and add this item instead?"
        primaryActionText="Replace"
        fullWidth
        maxWidth="md"
    />
);

export default ReplaceCartDialog;
