import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth(allowedRoles) {
	const { auth } = useAuth();
	const location = useLocation();

	//TODO: Change so that it reads roles from the JWT ?
	//TODO: Configure to single role.

	return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
		//All unathorized and etc. end up here right now. Configure later.
	);
}

export default RequireAuth;
