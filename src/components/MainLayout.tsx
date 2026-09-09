import { Outlet } from 'react-router-dom';

import Header from './header/Header';

const MainLayout = () => (
    <>
        <Header />
        <Outlet />
    </>
);

export default MainLayout;
