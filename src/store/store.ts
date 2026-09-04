import {
    Action,
    combineReducers,
    configureStore,
    Reducer,
} from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import restaurantsReducer from './slices/restaurants';
import snackbarReducer from './slices/snackbar';
// ...

const appReducer = combineReducers({
    auth: authReducer,
    snackbar: snackbarReducer,
    restaurants: restaurantsReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer<RootState, Action> = (state, action) => {
    if (action.type === 'GLOBAL_RESET') {
        state = undefined;
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});

// Infer the `AppDispatch`, and `AppStore` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
