import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";


type PrivateRoutesPropsType = {
    allowedRoles?: string[]
}

export const PrivateRoutes = ({ allowedRoles }: PrivateRoutesPropsType) => {

    const { roles, isAuthenticated } = useAuth()
    const location = useLocation();

    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : isAuthenticated
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}