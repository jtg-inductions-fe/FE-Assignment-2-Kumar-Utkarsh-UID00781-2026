import { useMemo } from 'react';

import { LinearProgress } from '@mui/material';

import ContainerizedBox from '@components/ContainerizedBox';
import OrdersList from '@components/order/OrdersList';
import { useAppSelector } from '@hooks/useAppSelector';

const Orders = () => {
    const orders = useAppSelector((state) => state.orders.orders);
    const orderStatus = useAppSelector((state) => state.orders.status);

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const restaurants = useAppSelector(
        (state) => state.restaurants.restaurants,
    );

    const userRestaurantsIds = useMemo(
        () =>
            restaurants
                .filter((restaurant) => restaurant.owner_id === currentUser?.id)
                .map(({ id }) => ({ id })),
        [restaurants, currentUser?.id],
    );

    const filteredOrders = (() => {
        if (!currentUser) {
            return [];
        }

        if (currentUser.role === 'customer') {
            return orders.filter(
                (order) => order.customerId === currentUser.id,
            );
        } else {
            return userRestaurantsIds.flatMap(({ id }) =>
                orders.filter((order) => order.restaurantId === id),
            );
        }
    })();

    const sortedOrders = filteredOrders.sort((a, b) => {
        const aTime = new Date(a.time).getTime();
        const bTime = new Date(b.time).getTime();
        return bTime - aTime;
    });

    const isLoading = orderStatus === 'pending';

    return (
        <ContainerizedBox>
            {isLoading ? (
                <LinearProgress />
            ) : (
                <OrdersList orders={sortedOrders} />
            )}
        </ContainerizedBox>
    );
};

export default Orders;
