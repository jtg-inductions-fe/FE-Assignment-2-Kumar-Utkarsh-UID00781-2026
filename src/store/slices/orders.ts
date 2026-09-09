import { createSlice } from '@reduxjs/toolkit';
import {
    OrderType,
    PushOrderPayloadType,
    UpdateOrderStatusPayloadType,
} from '@schemas/orders.schema';
import { createAppAsyncThunk } from '@store/createAppAsyncThunk';

interface OrdersState {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    updateStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    updateError: string | null;
    orders: OrderType[];
}

export const pushOrder = createAppAsyncThunk(
    '/orders/pushOrder',
    async ({ customerId, restaurantId, cartDetails }: PushOrderPayloadType) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newOrder: OrderType = {
            id: crypto.randomUUID(),
            customerId,
            restaurantId,
            items: cartDetails,
            time: new Date().toISOString(),
            status: 'pending',
        };

        return newOrder;
    },
);

export const updateOrderStatus = createAppAsyncThunk(
    '/orders/updateStatus',
    async (
        { orderId, newStatus }: UpdateOrderStatusPayloadType,
        { getState, rejectWithValue },
    ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const requestedOrder = getState().orders.orders.find(
            (order) => order.id === orderId,
        );
        if (!requestedOrder) {
            return rejectWithValue('Could not find order.');
        }

        const orderRestaurant = getState().restaurants.restaurants.find(
            (restaurant) => restaurant.id === requestedOrder?.restaurantId,
        );

        const currentUser = getState().auth.currentUser;

        if (currentUser?.id !== orderRestaurant?.owner_id) {
            return rejectWithValue(
                'Missing valid credentials to update order status',
            );
        }

        return { orderId, newStatus };
    },
);

const initialState: OrdersState = {
    status: 'idle',
    updateStatus: 'idle',
    error: null,
    updateError: null,
    orders: [],
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pushOrder.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(pushOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(pushOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to push order';
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.updateStatus = 'pending';
                state.updateError = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const requestedOrder = state.orders.find(
                    (order) => order.id === action.payload.orderId,
                );

                if (!requestedOrder) return;

                requestedOrder.status = action.payload.newStatus;
                state.updateStatus = 'succeeded';
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.updateError =
                    action.error.message ?? 'Failed to update order status';
                state.updateStatus = 'failed';
            });
    },
});

export default ordersSlice.reducer;
