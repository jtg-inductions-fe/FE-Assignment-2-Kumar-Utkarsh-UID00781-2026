import React from 'react';

import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import LoginForm from '@components/auth/LoginForm';
import SignupForm from '@components/auth/SignupForm';
import MainLayout from '@components/MainLayout';
import { ROUTES } from '@constant';
import { useAppSelector } from '@hooks/useAppSelector';
import Auth from '@pages/auth/Auth';
import Checkout from '@pages/Checkout';
import Discover from '@pages/Discover';
import NotFound from '@pages/NotFound';
import Orders from '@pages/Orders';
import RestaurantDetails from '@pages/RestaurantDetails';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = (): React.ReactNode => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const isAuthenticated = !!currentUser;
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.AUTH} element={<Auth />}>
                    <Route index element={<Navigate to={ROUTES.LOGIN} />} />
                    <Route path={ROUTES.LOGIN} element={<LoginForm />} />
                    <Route path={ROUTES.SIGNUP} element={<SignupForm />} />
                </Route>
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route element={<MainLayout />}>
                        <Route index element={<Discover />} />
                        <Route
                            path={`${ROUTES.RESTAURANT}/:restaurantId`}
                            element={<RestaurantDetails />}
                        />
                        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                        <Route path={ROUTES.ORDERS} element={<Orders />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;
