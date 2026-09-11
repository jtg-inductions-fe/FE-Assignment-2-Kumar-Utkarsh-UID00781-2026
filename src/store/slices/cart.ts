import { CartType } from 'types/cart.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartType = {
    restaurantId: null,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setRestaurant: (
            state,
            action: PayloadAction<{ restaurantId: string }>,
        ) => {
            state.restaurantId = action.payload.restaurantId;
        },
        addItem: (
            state,
            action: PayloadAction<{ foodItemId: string; quantity: number }>,
        ) => {
            const { foodItemId, quantity } = action.payload;

            const existingItem = state.items.find(
                (item) => item.id === foodItemId,
            );

            if (existingItem) {
                existingItem.quantity += quantity;
                return;
            }

            state.items.push({
                id: foodItemId,
                quantity,
            });
        },
        setItemQuantity: (
            state,
            action: PayloadAction<{ foodItemId: string; quantity: number }>,
        ) => {
            const requestedItem = state.items.find(
                (item) => item.id === action.payload.foodItemId,
            );

            if (!requestedItem) return;

            if (action.payload.quantity <= 0) {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload.foodItemId,
                );
                state.restaurantId = null;
                return;
            }

            requestedItem.quantity = action.payload.quantity;
        },
        removeItem: (state, action: PayloadAction<{ foodItemId: string }>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.foodItemId,
            );

            if (state.items.length === 0) {
                state.restaurantId = null;
            }
        },
        clearCart: () => initialState,
    },
});

export const {
    setRestaurant,
    addItem,
    setItemQuantity,
    removeItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
