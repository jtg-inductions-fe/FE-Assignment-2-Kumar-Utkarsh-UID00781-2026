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
import Auth from '@pages/Auth';
import Discover from '@pages/Discover';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = (): React.ReactNode => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const isAuthenticated = !!currentUser;
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.AUTH} element={<Auth />}>
                    <Route
                        index
                        element={<Navigate to={ROUTES.LOGIN} />}
                    ></Route>
                    <Route path="login" element={<LoginForm />}></Route>
                    <Route path="signup" element={<SignupForm />}></Route>
                </Route>
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route element={<MainLayout />}>
                        <Route index element={<Discover />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};
export default AppRoutes;
