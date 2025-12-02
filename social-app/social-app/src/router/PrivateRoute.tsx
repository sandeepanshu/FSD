import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserUtil } from "../authUtil/UserUtil";

const PrivateRoute: React.FC = () => {
  return UserUtil.isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/users/login" replace />
  );
};

export default PrivateRoute;
