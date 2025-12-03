import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/users/login" />;
};

export default PrivateRoute;
