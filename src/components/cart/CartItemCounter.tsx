import { Add, Remove } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    ButtonGroupProps,
    ButtonProps,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { removeItem, setItemQuantity } from '@store/slices/cart';
import { showSnackbar } from '@store/slices/snackbar';

type CartItemCounterProps = {
    availableStock: number;
    foodItemId: string;
};

const StyledButtonGroup = styled(ButtonGroup)<ButtonGroupProps>({
    height: 30,
    '& .MuiButtonGroup-grouped': {
        minWidth: 0,
    },
});

const QuantityField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    height: '100%',
    '&.MuiTextField-root': {
        padding: 0,
    },
    '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 0,
        width: 30,
    },
    '& .MuiOutlinedInput-input': {
        ...theme.typography.body1,
        fontWeight: 700,
        paddingInline: 0,
        textAlign: 'center',
    },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: theme.spacing(3),
    minWidth: 20,
    width: 20,
}));

const CartItemCounter = (props: CartItemCounterProps) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.id === props.foodItemId),
    );

    const quantity = cartItem?.quantity ?? 0;

    const handleIncrement = () => {
        if (quantity >= props.availableStock) {
            dispatch(
                showSnackbar({
                    message: `Only ${props.availableStock} units available`,
                    severity: 'warning',
                    duration: 2000,
                }),
            );
        }
        dispatch(
            setItemQuantity({
                foodItemId: props.foodItemId,
                quantity: quantity + 1,
            }),
        );
    };

    const handleDecrement = () => {
        if (quantity === 1) {
            handleRemove();
        }
        dispatch(
            setItemQuantity({
                foodItemId: props.foodItemId,
                quantity: quantity - 1,
            }),
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity =
            e.target.value === '' ? 0 : parseInt(e.target.value);

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

    const handleRemove = () => {
        dispatch(
            removeItem({
                foodItemId: props.foodItemId,
            }),
        );
    };
    return (
        <>
            <StyledButtonGroup variant="outlined">
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
            </StyledButtonGroup>
        </>
    );
};

export default CartItemCounter;
