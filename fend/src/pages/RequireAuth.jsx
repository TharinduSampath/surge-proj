import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ accountTypes }) {
	const { auth } = useAuth();
	const location = useLocation();

	const accountType = auth?.accountType;
	const hasAccessToken = auth?.accessToken != null ? true : false;

	return accountTypes.includes(accountType) ? (
		<Outlet />
	) : hasAccessToken ? (
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);

	//TODO: All unathorized and etc. end up here right now. Configure later.
}

export default RequireAuth;
