import { createSlice } from '@reduxjs/toolkit';
import { LoginDataType, SignupDataType } from '@schemas/auth.schema';
import { UserApiResponseType, UserType } from '@schemas/user.schema';
import { createAppAsyncThunk } from '@store/createAppAsyncThunk';

interface UsersDataApiResponse {
    data: UserType[];
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('/data/userData.json');
    const dataJSON = (await response.json()) as UsersDataApiResponse;
    return dataJSON.data;
});

export const login = createAppAsyncThunk(
    'auth/login',
    async (loginData: LoginDataType, { getState, rejectWithValue }) => {
        // Simulating fetching a specific user
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const users = getState().auth.users;

        const foundUser = users.find(
            (user) =>
                user.email.toLowerCase() === loginData.email.toLowerCase() &&
                user.password === loginData.password,
        );

        if (!foundUser) {
            return rejectWithValue('Invalid email or password');
        }

        const { password, ...currentUser } = foundUser;
        void password;
        return currentUser;
    },
);

export const signup = createAppAsyncThunk(
    'auth/signup',
    async (signupData: SignupDataType, { getState, rejectWithValue }) => {
        // Simulating time taken in creating a new user
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const users = getState().auth.users;

        const alreadyExists = users.some(
            (user) =>
                user.email.toLowerCase() === signupData.email.toLowerCase(),
        );

        if (alreadyExists) {
            return rejectWithValue('An account with this email already exists');
        }

        const newUser: UserType = {
            id: crypto.randomUUID(),
            email: signupData.email,
            password: signupData.password,
            username: signupData.username,
            role: signupData.role,
        };

        return newUser;
    },
);
interface AuthState {
    users: UserType[];
    currentUser: UserApiResponseType | null;
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    users: [] as UserType[],
    currentUser: null,
    status: 'idle',
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch users';
            })
            .addCase(login.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to login';
            })
            .addCase(signup.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to signup';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
