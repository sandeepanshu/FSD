import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

// Layout Components
import Home from "./layout/home/Home";
import NavBar from "./layout/navbar/NavBar";
import Alert from "./layout/util/Alert";
import Spinner from "./layout/util/Spinner";

// Public Components
import DeveloperList from "./modules/developers/components/DeveloperList";
import DeveloperDetails from "./modules/developers/components/DeveloperDetails";
import UserRegister from "./modules/users/components/UserRegister";
import UserLogin from "./modules/users/components/UserLogin";

// Private Components (Protected Routes)
import Dashboard from "./modules/profiles/components/Dashboard";
import CreateProfile from "./modules/profiles/components/CreateProfile";
import EditProfile from "./modules/profiles/components/EditProfile";
import AddEducation from "./modules/profiles/components/AddEducation";
import AddExperience from "./modules/profiles/components/AddExperience";
import PostList from "./modules/posts/components/PostList";
import PostDetails from "./modules/posts/components/PostDetails";

// Route Components
import PrivateRoute from "./router/PrivateRoute";

// Redux Actions & Utilities
import * as userActions from "./redux/users/user.actions";
import { AuthUtil } from "./authUtil/AuthUtil";
import { UserUtil } from "./authUtil/UserUtil";
import type { RootState } from "./redux/store";

/**
 * PublicRoute Component
 * Prevents authenticated users from accessing public-only routes (login/register)
 */
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner tip="Loading..." />
      </div>
    );
  }

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/profiles/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  // Initialize token on app load
  useEffect(() => {
    const token = UserUtil.getToken();
    if (token) {
      AuthUtil.setTokenHeader(token);
      dispatch(userActions.getUserInfo());
    }
  }, [dispatch]);

  // Show app loading spinner while checking authentication
  if (userLoading && UserUtil.getToken()) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Spinner tip="Loading application..." />
      </div>
    );
  }

  return (
    <Router>
      <Alert />
      <NavBar />

      {/* Main content area with padding for fixed navbar */}
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<DeveloperList />} />
          <Route
            path="/developers/:developerId"
            element={<DeveloperDetails />}
          />

          {/* Public-only Routes (redirect if authenticated) */}
          <Route
            path="/users/register"
            element={
              <PublicRoute>
                <UserRegister />
              </PublicRoute>
            }
          />
          <Route
            path="/users/login"
            element={
              <PublicRoute>
                <UserLogin />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profiles/dashboard" element={<Dashboard />} />
            <Route path="/profiles/create" element={<CreateProfile />} />
            <Route path="/profiles/edit/:profileId" element={<EditProfile />} />
            <Route path="/profiles/education" element={<AddEducation />} />
            <Route path="/profiles/experience" element={<AddExperience />} />

            <Route path="/posts/list" element={<PostList />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
