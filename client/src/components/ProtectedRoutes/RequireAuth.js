import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/* Basic component to protect the private routes */
const RequireAuth = () => {
  // Get auth value
  const { auth } = useAuth();
  // get current location
  const location = useLocation();

  /* If email value exists inside auth object, then allow access else 
  replace the visited private routes to /login page */
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
