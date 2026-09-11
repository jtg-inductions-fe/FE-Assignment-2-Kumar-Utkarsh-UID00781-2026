import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@constant';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    redirect?: string;
}
const ProtectedRoute = ({
    isAuthenticated,
    redirect = ROUTES.LOGIN,
}: ProtectedRouteProps) => {
    const location = useLocation();
    if (!isAuthenticated) {
        return (
            <Navigate to={redirect} state={{ redirectTo: location }} replace />
        );
    }
    return <Outlet />;
};

export default ProtectedRoute;
