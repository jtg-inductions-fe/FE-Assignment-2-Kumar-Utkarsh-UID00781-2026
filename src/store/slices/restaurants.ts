import { createSlice } from '@reduxjs/toolkit';
import {
    RestaurantFormDataType,
    restaurantsApiResponseSchema,
    RestaurantType,
} from '@schemas/restaurants.schema';
import { createAppAsyncThunk } from '@store/createAppAsyncThunk';

interface RestaurantsState {
    restaurants: RestaurantType[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: RestaurantsState = {
    restaurants: [],
    status: 'idle',
    error: null,
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

        if (!currentUser || currentUser.role !== 'owner') {
            return rejectWithValue(
                'Missing valid credentials to edit restaurant',
            );
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
            menu: [],
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
            });
    },
});

export default restaurantsSlice.reducer;
