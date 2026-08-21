import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarPayload {
    duration?: number;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
}

export interface SnackbarState extends SnackbarPayload {
    open: boolean;
}

const initialState: SnackbarState = {
    open: false,
    duration: 5000,
    message: '',
    severity: 'info',
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<SnackbarPayload>) => {
            state.open = true;
            state.duration = action.payload.duration;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideSnackbar: (state) => {
            state.open = false;
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
