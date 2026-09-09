import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ROUTES } from '@constant';
import { FoodItemType } from '@schemas/restaurants.schema';

type CartSummaryPropsType = {
    detailedCart: (FoodItemType & { quantity: number })[];
    onCheckout: () => void;
};

const CartSummaryContainer = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxWidth: 1280,
    marginInline: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(3),
    paddingBlock: theme.spacing(6),

    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
    },
}));

const CartSummaryTextContent = styled(Box)({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
});

const CartSummary = (props: CartSummaryPropsType) => {
    const navigate = useNavigate();

    const subtotal = props.detailedCart.reduce(
        (total, currentItem) =>
            total + currentItem.price * currentItem.quantity,
        0,
    );

    const handlePlacingOrder = () => {
        props.onCheckout();
        navigate(ROUTES.ORDERS);
    };

    return (
        <CartSummaryContainer>
            <CartSummaryTextContent>
                <Typography variant="h6" component="p" fontWeight={700}>
                    Subtotal
                </Typography>
                <Typography variant="h6" component="p" fontWeight={700}>
                    ₹{subtotal}
                </Typography>
            </CartSummaryTextContent>
            <Button variant="contained" onClick={handlePlacingOrder}>
                Place Order
            </Button>
        </CartSummaryContainer>
    );
};

export default CartSummary;
