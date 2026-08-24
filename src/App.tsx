import React from 'react';

import { Typography } from '@mui/material';

import { useAppSelector } from '@hooks/useAppSelector';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = (): React.ReactNode => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    return (
        <>
            <Typography variant="h1">
                Welcome, {currentUser?.username}
            </Typography>
        </>
    );
};

export default App;
