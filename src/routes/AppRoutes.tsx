import React from 'react';

import Login from 'pages/Login';
import Signup from 'pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import App from '../App';

const AppRoutes = (): React.ReactNode => {
    // TODO: Will be removed with global auth states
    const isConsumer = true;
    const isOwner = false;
    const isAuthenticated = isConsumer || isOwner;
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
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
