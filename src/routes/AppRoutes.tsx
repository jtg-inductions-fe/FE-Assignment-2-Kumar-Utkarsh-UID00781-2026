import React from 'react';

import LoginForm from 'components/auth/LoginForm';
import SignupForm from 'components/auth/SignupForm';
import { useAppSelector } from 'hooks/useAppSelector';
import Auth from 'pages/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import App from '../App';

const AppRoutes = (): React.ReactNode => {
    // TODO: Will be removed with global auth states
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
                    <Route path="/" element={<App />} />
                </Route>
            </Routes>
        </Router>
    );
};
export default AppRoutes;
