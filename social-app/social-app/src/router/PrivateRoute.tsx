import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import Spinner from "../layout/util/Spinner";
import { getUserInfo } from "../redux/users/user.actions";

const PrivateRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken && !isAuthenticated && !loading) {
      dispatch(getUserInfo());
    }
  }, [dispatch, isAuthenticated, loading]);

  if (loading) {
    return <Spinner tip="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/users/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
