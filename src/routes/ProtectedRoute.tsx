import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    redirect?: string;
}
const ProtectedRoute = ({
    isAuthenticated,
    redirect = '/login',
}: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to={redirect} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
