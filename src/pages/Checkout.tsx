import { useEffect, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
    Button,
    Grid2 as Grid,
    LinearProgress,
    Skeleton,
    Typography,
} from '@mui/material';

import CartItemList from '@components/cart/CartItemList';
import CartSummary from '@components/cart/CartSummary';
import ContainerizedBox from '@components/ContainerizedBox';
import { FoodItemType } from '@components/restaurant/foodItem.schema';
import { RestaurantType } from '@components/restaurant/restaurants.schema';
import { ROUTES } from '@constant';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { clearCart } from '@store/slices/cart';
import { pushOrder } from '@store/slices/orders';
import { fetchRestaurantById } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';
const Checkout = () => {
    const dispatch = useAppDispatch();

    const cart = useAppSelector((state) => state.cart);
    const minimalCart = cart.items;

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const [cartRestaurant, setCartRestaurant] = useState<RestaurantType | null>(
        null,
    );

    const detailedCart: (FoodItemType & { quantity: number })[] =
        minimalCart.flatMap((cartItem) => {
            const itemDetails = cartRestaurant?.menu.find(
                (menuItem) => menuItem.id === cartItem.id,
            );
            if (!itemDetails) return [];
            return [{ quantity: cartItem.quantity, ...itemDetails }];
        });

    const restaurantStatus = useAppSelector(
        (state) => state.restaurants.status,
    );
    const isFetching = restaurantStatus === 'pending';

    useEffect(() => {
        if (!cart?.restaurantId) return;
        let ignore = false;

        void (async () => {
            try {
                const restaurant = await dispatch(
                    fetchRestaurantById(cart?.restaurantId ?? ''),
                ).unwrap();
                if (ignore) return;
                setCartRestaurant(restaurant);
            } catch (error) {
                if (ignore) return;
                dispatch(
                    showSnackbar({
                        message: error as string,
                        severity: 'error',
                    }),
                );
            }
        })();

        return () => {
            ignore = true;
        };
    }, [cart?.restaurantId, dispatch]);

    const placeOrder = async () => {
        try {
            const requiredCartDetails = detailedCart.map(
                ({ id, name, price, quantity, type }) => ({
                    id,
                    name,
                    price,
                    quantity,
                    type,
                }),
            );

            await dispatch(
                pushOrder({
                    customerId: currentUser?.id ?? '',
                    restaurantId: cartRestaurant?.id ?? '',
                    cartDetails: requiredCartDetails,
                }),
            ).unwrap();
            dispatch(clearCart());
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: error as string,
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <ContainerizedBox>
            {isFetching ? (
                <LinearProgress />
            ) : cart.items.length === 0 ? (
                <Grid container spacing={4}>
                    <Grid size={12}>
                        <Typography textAlign="center">
                            No items added to cart. Add items to view cart
                            details here.
                        </Typography>
                    </Grid>
                    <Grid container size={12} justifyContent="center">
                        <Grid>
                            <RouterLink to={ROUTES.HOME}>
                                <Button variant="contained">
                                    Discover Restaurants
                                </Button>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={4}>
                    <Grid size={12}>
                        <Typography variant="h3" component="h1">
                            Checkout
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 6, md: 4 }}>
                        <Typography variant="h5" component="h2">
                            {!cartRestaurant ? (
                                <Skeleton />
                            ) : (
                                cartRestaurant.name
                            )}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <CartItemList detailedCart={detailedCart} />
                    </Grid>
                    <Grid size={12}>
                        <CartSummary
                            detailedCart={detailedCart}
                            onCheckout={() => void placeOrder()}
                        />
                    </Grid>
                </Grid>
            )}
        </ContainerizedBox>
    );
};

export default Checkout;
