import { Delete } from '@mui/icons-material';
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import nonVegIcon from '@assets/images/non-veg-icon.png';
import vegIcon from '@assets/images/veg-logo.png';
import CartItemCounter from '@components/cart/CartItemCounter';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { FoodItemType } from '@schemas/restaurants.schema';
import { removeItem } from '@store/slices/cart';

type CartItemProps = {
    item: FoodItemType & {
        quantity: number;
    };
};

const CartItemContainer = styled(Card)({
    display: 'flex',
    boxShadow: 'none',
});

const CartItemContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    alignItems: 'start',
    gap: theme.spacing(4),
    width: '100%',
    padding: 0,
    paddingBlock: theme.spacing(2),
    borderRadius: 0,
}));

const CartItemTextContent = styled(Stack)({
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',

    '&:last-child': {
        paddingBottom: 0,
    },
});

const CartTypeIcon = styled('img')(({ theme }) => ({
    width: 12,
    height: 12,
    [theme.breakpoints.up('md')]: {
        width: 16,
        height: 16,
    },
}));

const CartItemCardActionsContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBlock: theme.spacing(2),
    alignItems: 'end',
}));

const CartItemCardActions = styled(CardActions)({
    padding: 0,
    display: 'flex',
});

const CartItemDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useAppDispatch();
    const deleteItem = () => {
        dispatch(removeItem({ foodItemId: item.id }));
    };
    return (
        <>
            <CartItemContainer>
                <CartItemContent>
                    <CartItemTextContent>
                        <CartTypeIcon
                            src={item.type === 'veg' ? vegIcon : nonVegIcon}
                        />
                        <Typography
                            variant="body1"
                            component="h2"
                            fontWeight={700}
                        >
                            {item.name}
                        </Typography>
                    </CartItemTextContent>
                </CartItemContent>
                <CartItemCardActionsContainer>
                    <Typography variant="body1" fontWeight={700}>
                        ₹{item.price * item.quantity}
                    </Typography>
                    <CartItemCardActions>
                        <CartItemCounter
                            availableStock={item.stock}
                            foodItemId={item.id}
                        />
                        <IconButton onClick={deleteItem}>
                            <Delete fontSize="small" color="error" />
                        </IconButton>
                    </CartItemCardActions>
                </CartItemCardActionsContainer>
            </CartItemContainer>
            <CartItemDivider />
        </>
    );
};

export default CartItem;
