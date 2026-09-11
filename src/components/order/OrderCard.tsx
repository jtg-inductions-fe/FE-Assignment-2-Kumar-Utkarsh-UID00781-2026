import { useState } from 'react';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { CardProps, Collapse } from '@mui/material';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    IconButtonProps,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ItemsList from '@components/order/ItemsList';
import OrderProgress from '@components/order/OrderProgress';
import UpdateStatusButton from '@components/order/UpdateStatusButton';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
    orderStatusArray,
    OrderStatusType,
    OrderType,
} from '@schemas/orders.schema';
import { updateOrderStatus } from '@store/slices/orders';
import { showSnackbar } from '@store/slices/snackbar';

type OrderCardProps = {
    order: OrderType;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const formatStatus = (status: string) => {
    const titledStatus = status[0].toUpperCase() + status.slice(1);
    const statusWithSpaces = titledStatus.split('_').join(' ');
    return statusWithSpaces;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    void expand;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
    padding: theme.spacing(2),
    boxShadow: 'none',
    borderRadius: theme.spacing(6),
}));

const CardBottomContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingBlock: 0,
});

const OrderCard = ({ order }: OrderCardProps) => {
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const restaurants = useAppSelector(
        (state) => state.restaurants.restaurants,
    );

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const updateStatus = async (newStatus?: OrderStatusType) => {
        const currStatus = order.status;

        if (currStatus === 'rejected') return;

        const currStatusIndex = orderStatusArray.indexOf(currStatus);

        const nextStatus = newStatus ?? orderStatusArray[currStatusIndex + 1];

        try {
            await dispatch(
                updateOrderStatus({
                    orderId: order.id,
                    newStatus: nextStatus,
                }),
            ).unwrap();
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: error as string,
                    severity: 'error',
                }),
            );
        }
    };

    const orderRestaurant = restaurants.find(
        (restaurant) => restaurant.id === order.restaurantId,
    );
    const isOwner = currentUser?.id === orderRestaurant?.owner_id;
    const orderSubtotal = order.items.reduce(
        (total, item) => (total += item.price * item.quantity),
        0,
    );

    return (
        <StyledCard variant="outlined">
            <CardHeader
                action={
                    isOwner ? (
                        <UpdateStatusButton
                            currStatus={order.status}
                            onUpdate={(newStatus) =>
                                void updateStatus(newStatus)
                            }
                        />
                    ) : (
                        <Chip
                            color="secondary"
                            label={formatStatus(order.status)}
                        />
                    )
                }
                title={orderRestaurant?.name}
                subheader={`${new Date(order.time).toLocaleDateString('en-IN')} | ${new Date(order.time).toLocaleTimeString('en-IN')}`}
            />
            <CardContent>
                <ItemsList items={order.items} />
            </CardContent>
            <CardBottomContent>
                <Typography variant="h6" component="p">
                    ₹{orderSubtotal}
                </Typography>
                {isOwner && (
                    <Chip
                        color="secondary"
                        variant="outlined"
                        label={formatStatus(order.status)}
                    />
                )}
            </CardBottomContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <OrderProgress orderStatus={order.status} />
                </CardContent>
            </Collapse>
        </StyledCard>
    );
};

export default OrderCard;
