import { Card, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import nonVegIcon from '@assets/images/non-veg-icon.png';
import vegIcon from '@assets/images/veg-logo.png';
import { OrderItemType } from '@schemas/orders.schema';

type OrderItemProps = {
    item: OrderItemType;
};

const OrderItemContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    boxShadow: 'none',
    marginBlock: theme.spacing(1),
}));

const OrderItemContent = styled(CardContent)(({ theme }) => ({
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

const OrderItemTextContent = styled(Stack)(({ theme }) => ({
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'center',

    '&:last-child': {
        paddingBottom: 0,
    },
}));
const OrderTypeIcon = styled('img')(({ theme }) => ({
    width: 12,
    height: 12,
    [theme.breakpoints.up('md')]: {
        width: 16,
        height: 16,
    },
}));

const OrderItem = ({ item }: OrderItemProps) => (
    <>
        <OrderItemContainer>
            <OrderItemContent>
                <OrderItemTextContent>
                    <OrderTypeIcon
                        alt={
                            item.type === 'veg'
                                ? 'Vegetarian'
                                : 'Non-vegetarian'
                        }
                        src={item.type === 'veg' ? vegIcon : nonVegIcon}
                    />
                    <Typography variant="body1" component="h2" fontWeight={500}>
                        {item.quantity} x {item.name}
                    </Typography>
                </OrderItemTextContent>
            </OrderItemContent>
        </OrderItemContainer>
    </>
);

export default OrderItem;
