import { Card, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import nonVegIcon from '@assets/images/non-veg-icon.png';
import vegIcon from '@assets/images/veg-logo.png';
import { OrderItemType } from '@schemas/orders.schema';

type OrderItemProps = {
    item: OrderItemType;
};

const CartItemContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    boxShadow: 'none',
    marginBlock: theme.spacing(1),
}));

const CartItemContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    alignItems: 'start',
    gap: theme.spacing(4),
    width: '100%',
    padding: 0,
    paddingBlock: theme.spacing(2),
    borderRadius: 0,
    '&:last-child': {
        paddingBottom: 0,
    },
}));

const CartItemTextContent = styled(Stack)(({ theme }) => ({
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'center',

    '&:last-child': {
        paddingBottom: 0,
    },
}));
const CartTypeIcon = styled('img')(({ theme }) => ({
    width: 12,
    height: 12,
    [theme.breakpoints.up('md')]: {
        width: 16,
        height: 16,
    },
}));

const OrderItem = ({ item }: OrderItemProps) => (
    <>
        <CartItemContainer>
            <CartItemContent>
                <CartItemTextContent>
                    <CartTypeIcon
                        src={item.type === 'veg' ? vegIcon : nonVegIcon}
                    />
                    <Typography variant="body1" component="h2" fontWeight={500}>
                        {item.quantity} x {item.name}
                    </Typography>
                </CartItemTextContent>
            </CartItemContent>
        </CartItemContainer>
    </>
);

export default OrderItem;
