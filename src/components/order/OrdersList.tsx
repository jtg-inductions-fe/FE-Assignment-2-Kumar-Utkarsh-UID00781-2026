import { Stack, Typography } from '@mui/material';

import OrderCard from '@components/order/OrderCard';
import { OrderType } from '@schemas/orders.schema';

type OrdersListProps = {
    orders: OrderType[];
};

const OrdersList = ({ orders }: OrdersListProps) => (
    <>
        {orders.length === 0 ? (
            <Typography textAlign="center">No orders available.</Typography>
        ) : (
            <Stack spacing={6}>
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </Stack>
        )}
    </>
);

export default OrdersList;
