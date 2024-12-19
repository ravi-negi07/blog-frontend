import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoutes;
