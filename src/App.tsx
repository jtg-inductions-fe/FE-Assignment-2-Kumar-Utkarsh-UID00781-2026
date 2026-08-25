import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '@components/header/Header';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = (): React.ReactNode => (
    <>
        <Header />
        <Outlet />
    </>
);

export default App;
