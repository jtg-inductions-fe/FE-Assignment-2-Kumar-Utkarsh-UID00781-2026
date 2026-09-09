import { useEffect, useState } from 'react';

import { Add, Remove } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    ButtonProps,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ReplaceCartDialog from '@components/cart/ReplaceCartDialog';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
    addItem,
    clearCart,
    setItemQuantity,
    setRestaurant,
} from '@store/slices/cart';
import { showSnackbar } from '@store/slices/snackbar';

type AddToCartProps = {
    availableStock: number;
    restaurantId: string;
    foodItemId: string;
};

const QuantityField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    height: '100%',
    '&.MuiTextField-root': {
        padding: 0,
    },
    '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 0,
        width: 40,
    },
    '& .MuiOutlinedInput-input': {
        ...theme.typography.body1,
        fontWeight: 700,
        paddingBlock: theme.spacing(3.4),
        paddingInline: 0,
        textAlign: 'center',
    },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: 40,
    padding: theme.spacing(3),
}));

const AddToCartButton = (props: AddToCartProps & ButtonProps) => {
    const dispatch = useAppDispatch();

    const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);

    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.id === props.foodItemId),
    );
    const quantity = cartItem?.quantity ?? 0;

    const cart = useAppSelector((state) => state.cart);

    useEffect(() => {
        if (quantity >= props.availableStock) {
            dispatch(
                showSnackbar({
                    message: `Only ${props.availableStock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );
        }
    }, [quantity, props.availableStock, dispatch]);

    const handleAdd = () => {
        if (cart.restaurantId && cart.restaurantId !== props.restaurantId) {
            setReplaceDialogOpen(true);
            return;
        }

        if (!cart.restaurantId) {
            dispatch(
                setRestaurant({
                    restaurantId: props.restaurantId,
                }),
            );
        }

        dispatch(
            addItem({
                foodItemId: props.foodItemId,
                quantity: 1,
            }),
        );
    };

    const handleIncrement = () => {
        if (quantity >= props.availableStock) {
            dispatch(
                showSnackbar({
                    message: `Only ${props.availableStock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );

            return;
        }

        dispatch(
            setItemQuantity({
                foodItemId: props.foodItemId,
                quantity: quantity + 1,
            }),
        );
    };

    const handleDecrement = () => {
        dispatch(
            setItemQuantity({
                foodItemId: props.foodItemId,
                quantity: quantity - 1,
            }),
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);

        if (isNaN(newQuantity) || newQuantity < 0) return;

        if (newQuantity > props.availableStock) {
            dispatch(
                showSnackbar({
                    message: `Only ${props.availableStock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );

            return;
        }

        dispatch(
            setItemQuantity({
                foodItemId: props.foodItemId,
                quantity: newQuantity,
            }),
        );
    };

    const handleCloseReplaceDialog = () => {
        setReplaceDialogOpen(false);
    };

    const handleConfirmation = () => {
        dispatch(clearCart());

        dispatch(
            setRestaurant({
                restaurantId: props.restaurantId,
            }),
        );

        dispatch(
            addItem({
                foodItemId: props.foodItemId,
                quantity: 1,
            }),
        );

        setReplaceDialogOpen(false);
    };

    return (
        <>
            {props.availableStock <= 0 ? (
                <StyledButton variant="contained" disabled sx={{ width: 140 }}>
                    <Typography color="white" fontWeight={700}>
                        Out of Stock
                    </Typography>
                </StyledButton>
            ) : quantity <= 0 ? (
                <StyledButton
                    variant="contained"
                    onClick={handleAdd}
                    sx={{ width: 120 }}
                >
                    <Typography color="white" fontWeight={700}>
                        Add
                    </Typography>
                </StyledButton>
            ) : (
                <ButtonGroup variant="outlined">
                    <StyledButton
                        onClick={handleDecrement}
                        aria-label="Decrement quantity"
                    >
                        <Remove fontSize="small" />
                    </StyledButton>
                    <QuantityField
                        value={quantity}
                        onChange={handleChange}
                        slotProps={{
                            htmlInput: {
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            },
                        }}
                    />
                    <StyledButton
                        onClick={handleIncrement}
                        aria-label="Increment quantity"
                        disabled={quantity >= props.availableStock}
                    >
                        <Add fontSize="small" />
                    </StyledButton>
                </ButtonGroup>
            )}
            <ReplaceCartDialog
                open={replaceDialogOpen}
                onClose={handleCloseReplaceDialog}
                onConfirmation={handleConfirmation}
            />
        </>
    );
};

export default AddToCartButton;
