import { createSlice } from '@reduxjs/toolkit';
import {
    FoodItemFormDataType,
    FoodItemType,
    RestaurantFormDataType,
    restaurantsApiResponseSchema,
    RestaurantType,
} from '@schemas/restaurants.schema';
import { createAppAsyncThunk } from '@store/createAppAsyncThunk';

interface RestaurantsState {
    currentRestaurant: RestaurantType | null;
    restaurants: RestaurantType[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    foodItemStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
    foodItemError: string | null;
}

const initialState: RestaurantsState = {
    currentRestaurant: null,
    restaurants: [],
    status: 'idle',
    error: null,
    foodItemStatus: 'idle',
    foodItemError: null,
};

export const fetchRestaurants = createAppAsyncThunk(
    'restaurants/fetchRestaurants',
    async (_, { getState, rejectWithValue }) => {
        const response = await fetch('/data/restaurantsData.json');

        const result = restaurantsApiResponseSchema.safeParse(
            await response.json(),
        );
        if (result.success) {
            const restaurantsDataJSON = result.data;
            const currentUser = getState().auth.currentUser;
            if (currentUser?.role !== 'owner') {
                return restaurantsDataJSON.data;
            }

            return restaurantsDataJSON.data.filter(
                (restaurant) => restaurant.owner_id === currentUser.id,
            );
        } else {
            return rejectWithValue('Could not fetch restaurants at the moment');
        }
    },
);

export const fetchRestaurantById = createAppAsyncThunk(
    'restaurants/fetchRestaurantById',
    async (id: string, { getState }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const restaurants = getState().restaurants.restaurants;

        const requestedRestaurant = restaurants.find(
            (restaurant) => restaurant.id === id,
        );

        if (!requestedRestaurant) return null;
        return requestedRestaurant;
    },
);

export const addRestaurant = createAppAsyncThunk(
    'restaurants/addRestaurant',
    async (
        restaurantFormData: RestaurantFormDataType,
        { getState, rejectWithValue },
    ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentUser = getState().auth.currentUser;

        if (!currentUser || currentUser.role !== 'owner') {
            return rejectWithValue(
                'Missing valid credentials to add restaurant',
            );
        }

        const newRestaurant: RestaurantType = {
            id: crypto.randomUUID(),
            owner_id: currentUser.id,
            name: restaurantFormData.name,
            description: restaurantFormData.description,
            img_src: restaurantFormData.img_src,
            veg: restaurantFormData.veg,
            non_veg: restaurantFormData.non_veg,
            store_timings: {
                open: restaurantFormData.open_timing,
                close: restaurantFormData.close_timing,
            },
            address: restaurantFormData.address,
            menu: [],
        };

        return newRestaurant;
    },
);

export const editRestaurant = createAppAsyncThunk(
    'restaurants/editRestaurant',
    async (
        restaurantFormData: RestaurantFormDataType & { id: string },
        { getState, rejectWithValue },
    ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentUser = getState().auth.currentUser;
        const currentRestaurants = getState().restaurants.restaurants;

        if (!currentUser || currentUser.role !== 'owner') {
            return rejectWithValue(
                'Missing valid credentials to edit restaurant',
            );
        }

        const requestedRestaurant = currentRestaurants.find(
            (restaurant) => restaurant.id === restaurantFormData.id,
        );
        if (!requestedRestaurant) {
            return rejectWithValue('Cannot find restaurant');
        }

        const editedRestaurant: RestaurantType = {
            id: restaurantFormData.id,
            owner_id: currentUser.id,
            name: restaurantFormData.name,
            description: restaurantFormData.description,
            img_src: restaurantFormData.img_src,
            veg: restaurantFormData.veg,
            non_veg: restaurantFormData.non_veg,
            store_timings: {
                open: restaurantFormData.open_timing,
                close: restaurantFormData.close_timing,
            },
            address: restaurantFormData.address,
            menu: requestedRestaurant.menu,
        };

        return editedRestaurant;
    },
);

export const deleteRestaurant = createAppAsyncThunk(
    'restaurants/deleteRestaurant',
    async (restaurantId: string, { rejectWithValue, getState }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentUser = getState().auth.currentUser;

        if (!currentUser || currentUser.role !== 'owner') {
            return rejectWithValue(
                'Missing valid credentials to delete restaurant',
            );
        }

        return restaurantId;
    },
);

export const addFoodItem = createAppAsyncThunk(
    '/restaurants/addFoodItem',
    async (
        foodItemFormData: FoodItemFormDataType & { restaurantId: string },
        { getState, rejectWithValue },
    ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const currentUser = getState().auth.currentUser;
        const itemRestaurant = getState().restaurants.restaurants.find(
            (restaurant) => restaurant.id === foodItemFormData.restaurantId,
        );

        if (!itemRestaurant)
            return rejectWithValue('Could not find restaurant');

        if (!currentUser || !(currentUser.id === itemRestaurant.owner_id))
            return rejectWithValue(
                'Missing valid credentials to add food item',
            );

        const { restaurantId, ...requiredFormData } = foodItemFormData;
        void restaurantId;

        const newFoodItem: FoodItemType = {
            id: crypto.randomUUID(),
            ...requiredFormData,
        };

        return { newFoodItem, restaurantId };
    },
);

export const editFoodItem = createAppAsyncThunk(
    '/restaurants/editFoodItem',
    async (
        foodItemFormData: FoodItemFormDataType & {
            restaurantId: string;
            id: string;
        },
        { getState, rejectWithValue },
    ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentUser = getState().auth.currentUser;
        const itemRestaurant = getState().restaurants.restaurants.find(
            (restaurant) => restaurant.id === foodItemFormData.restaurantId,
        );
        if (!itemRestaurant)
            return rejectWithValue('Could not find restaurant');
        if (!currentUser || !(currentUser.id === itemRestaurant.owner_id))
            return rejectWithValue(
                'Missing valid credentials to add food item',
            );

        const { restaurantId, ...requiredFormData } = foodItemFormData;
        const editedFoodItem: FoodItemType = {
            ...requiredFormData,
        };

        return { editedFoodItem, restaurantId };
    },
);

export const deleteFoodItem = createAppAsyncThunk(
    '/restaurants/deleteFoodItem',
    async (
        {
            foodItemId,
            restaurantId,
        }: {
            foodItemId: string;
            restaurantId: string;
        },
        { getState, rejectWithValue },
    ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const restaurants = getState().restaurants.restaurants;
        const currentUser = getState().auth.currentUser;

        const requestedRestaurant = restaurants.find(
            (restaurant) => restaurant.id === restaurantId,
        );

        if (!requestedRestaurant) {
            return rejectWithValue('Could not find restaurant.');
        }

        if (
            !currentUser ||
            !(currentUser.id === requestedRestaurant.owner_id)
        ) {
            return rejectWithValue(
                'Missing valid credentials to delete food item',
            );
        }

        const requestedItem = requestedRestaurant.menu.find(
            (item) => item.id === foodItemId,
        );

        if (!requestedItem) {
            return rejectWithValue('Could not find food item');
        }

        return { restaurantId, foodItemId };
    },
);

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.restaurants = action.payload ?? [];
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ?? 'Failed to fetch restaurants';
            })
            .addCase(fetchRestaurantById.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchRestaurantById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentRestaurant = action.payload;
            })
            .addCase(fetchRestaurantById.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ?? 'Failed to delete restaurant';
            })
            .addCase(addRestaurant.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(addRestaurant.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.restaurants.push(action.payload);
            })
            .addCase(addRestaurant.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ?? 'Failed to add restaurant';
            })
            .addCase(editRestaurant.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(editRestaurant.fulfilled, (state, action) => {
                state.status = 'succeeded';

                const index = state.restaurants.findIndex(
                    (restaurant) => restaurant.id === action.payload.id,
                );

                if (index === -1) return;

                state.restaurants[index] = action.payload;
            })
            .addCase(editRestaurant.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ?? 'Failed to edit restaurant';
            })
            .addCase(deleteRestaurant.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(deleteRestaurant.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.restaurants.findIndex(
                    (restaurant) => restaurant.id === action.payload,
                );

                if (index === -1) return;

                state.restaurants.splice(index, 1);
            })
            .addCase(deleteRestaurant.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message ?? 'Failed to delete restaurant';
            })
            .addCase(addFoodItem.pending, (state) => {
                state.foodItemStatus = 'pending';
                state.foodItemError = null;
            })
            .addCase(addFoodItem.fulfilled, (state, action) => {
                state.foodItemStatus = 'succeeded';

                const requestedRestaurant = state.restaurants.find(
                    (restaurant) =>
                        restaurant.id === action.payload.restaurantId,
                );
                if (!requestedRestaurant) return;

                requestedRestaurant.menu.push(action.payload.newFoodItem);
                state.currentRestaurant = requestedRestaurant;
            })
            .addCase(addFoodItem.rejected, (state, action) => {
                state.foodItemStatus = 'failed';
                state.foodItemError =
                    action.error.message ?? 'Failed to add food item';
            })
            .addCase(editFoodItem.pending, (state) => {
                state.foodItemStatus = 'pending';
                state.foodItemError = null;
            })
            .addCase(editFoodItem.fulfilled, (state, action) => {
                state.foodItemStatus = 'succeeded';

                const requestedRestaurant = state.restaurants.find(
                    (restaurant) =>
                        restaurant.id === action.payload.restaurantId,
                );

                if (!requestedRestaurant) return;

                const requestedFoodItemIndex =
                    requestedRestaurant.menu.findIndex(
                        (foodItem) =>
                            foodItem.id === action.payload.editedFoodItem.id,
                    );

                if (requestedFoodItemIndex == -1) return;
                requestedRestaurant.menu[requestedFoodItemIndex] =
                    action.payload.editedFoodItem;
                state.currentRestaurant = requestedRestaurant;
            })
            .addCase(editFoodItem.rejected, (state, action) => {
                state.foodItemStatus = 'failed';
                state.foodItemError =
                    action.error.message ?? 'Failed to edit food item';
            })
            .addCase(deleteFoodItem.pending, (state) => {
                state.foodItemStatus = 'pending';
                state.foodItemError = null;
            })
            .addCase(deleteFoodItem.fulfilled, (state, action) => {
                state.foodItemStatus = 'succeeded';

                const requestedRestaurant = state.restaurants.find(
                    (restaurant) =>
                        restaurant.id === action.payload.restaurantId,
                );

                if (!requestedRestaurant) return;

                const requestedFoodItemIndex =
                    requestedRestaurant.menu.findIndex(
                        (foodItem) => foodItem.id === action.payload.foodItemId,
                    );
                if (requestedFoodItemIndex === -1) return;
                requestedRestaurant.menu.splice(requestedFoodItemIndex, 1);
                state.currentRestaurant = requestedRestaurant;
            })
            .addCase(deleteFoodItem.rejected, (state, action) => {
                state.foodItemStatus = 'failed';
                state.foodItemError =
                    action.error.message ?? 'Failed to delete food item';
            });
    },
});

export default restaurantsSlice.reducer;
