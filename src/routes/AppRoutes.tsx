import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from '@components/auth/LoginForm';
import SignupForm from '@components/auth/SignupForm';
import { ROUTES } from '@constant';
import { useAppSelector } from '@hooks/useAppSelector';
import Auth from '@pages/Auth';

import ProtectedRoute from './ProtectedRoute';
import App from '../App';

const AppRoutes = (): React.ReactNode => {
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const isAuthenticated = !!currentUser;
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />}>
                    <Route path="login" element={<LoginForm />}></Route>
                    <Route path="signup" element={<SignupForm />}></Route>
                </Route>
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route path={ROUTES.HOME} element={<App />} />
                </Route>
            </Routes>
        </Router>
    );
};
export default AppRoutes;
