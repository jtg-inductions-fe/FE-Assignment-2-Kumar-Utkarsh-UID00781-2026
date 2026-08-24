import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constant';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    redirect?: string;
}
const ProtectedRoute = ({
    isAuthenticated,
    redirect = ROUTES.LOGIN,
}: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to={redirect} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
