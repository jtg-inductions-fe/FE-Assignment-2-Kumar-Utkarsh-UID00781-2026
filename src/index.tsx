import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import GlobalSnackbar from '@components/GlobalSnackbar';
import { store } from '@store/store';
import { theme } from '@theme';

import AppRoutes from './routes/AppRoutes';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalSnackbar />
                <AppRoutes />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
