import React from 'react';

import AppRoutes from 'routes/AppRoutes';

import { CssBaseline } from '@mui/material';

import GlobalSnackbar from '@components/GlobalSnackbar';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { fetchUsers } from '@store/slices/auth';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = (): React.ReactNode => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);

    React.useEffect(() => {
        if (authStatus === 'idle') {
            void dispatch(fetchUsers());
        }
    }, [authStatus, dispatch]);

    return (
        <>
            <CssBaseline />
            <GlobalSnackbar />
            <AppRoutes />
        </>
    );
};

export default App;
