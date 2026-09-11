import React from 'react';

import AppRoutes from 'routes/AppRoutes';

import { CssBaseline } from '@mui/material';

import GlobalSnackbar from '@components/GlobalSnackbar';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { fetchUsers } from '@store/slices/auth';
import { fetchRestaurants } from '@store/slices/restaurants';
import { showSnackbar } from '@store/slices/snackbar';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = (): React.ReactNode => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);
    const currentUser = useAppSelector((state) => state.auth.currentUser);

    React.useEffect(() => {
        if (authStatus === 'idle') {
            const loadUsers = async () => {
                try {
                    await dispatch(fetchUsers()).unwrap();
                } catch (error) {
                    dispatch(
                        showSnackbar({
                            message: error as string,
                            severity: 'error',
                        }),
                    );
                }
            };
            void loadUsers();
        }
    }, [authStatus, dispatch]);

    React.useEffect(() => {
        if (currentUser) {
            const loadRestaurants = async () => {
                try {
                    await dispatch(fetchRestaurants()).unwrap();
                } catch (error) {
                    dispatch(
                        showSnackbar({
                            message: error as string,
                            severity: 'error',
                        }),
                    );
                }
            };
            void loadRestaurants();
        }
    }, [dispatch, currentUser]);

    return (
        <>
            <CssBaseline />
            <GlobalSnackbar />
            <AppRoutes />
        </>
    );
};

export default App;
