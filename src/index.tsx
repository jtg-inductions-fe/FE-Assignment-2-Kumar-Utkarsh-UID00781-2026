import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'App';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material';

import { store } from '@store/store';
import { theme } from '@theme';

import '@schemas/auth.schema';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
