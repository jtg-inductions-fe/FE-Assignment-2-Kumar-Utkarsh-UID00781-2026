import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import usersJSON from '../../utils/data/userData.json' with { type: 'json' };

interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    role: 'customer' | 'owner';
}

interface AuthState {
    users: User[];
    currentUser: User | null;
}

const initialState: AuthState = {
    users: usersJSON.users as User[],
    currentUser: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ email: string; password: string }>,
        ) => {
            const foundUser = state.users.find(
                (user) =>
                    user.email.toLowerCase() ===
                        action.payload.email.toLowerCase() &&
                    user.password === action.payload.password,
            );
            state.currentUser = foundUser || null;
        },
        signup: (
            state,
            action: PayloadAction<{
                email: string;
                password: string;
                username: string;
                role: 'customer' | 'owner';
            }>,
        ) => {
            const alreadyExists = state.users.some(
                (user) => action.payload.email === user.email,
            );

            if (alreadyExists) return;

            const newUser: User = {
                id: crypto.randomUUID(),
                email: action.payload.email,
                password: action.payload.password,
                username: action.payload.username,
                role: action.payload.role,
            };

            state.users.push(newUser);
            state.currentUser = newUser;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    },
});

export const { login, signup, logout } = authSlice.actions;

export default authSlice.reducer;
