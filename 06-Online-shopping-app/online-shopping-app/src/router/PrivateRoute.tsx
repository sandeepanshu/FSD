import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.users
  );

  // while fetching user info, prevent redirect
  if (loading) return null;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/users/login" replace />
  );
};

export default PrivateRoute;
