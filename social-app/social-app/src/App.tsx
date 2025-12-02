import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";

import Home from "./layout/home/Home";
import NavBar from "./layout/navbar/NavBar";
import DeveloperList from "./modules/developers/components/DeveloperList";
import DeveloperDetails from "./modules/developers/components/DeveloperDetails";
import UserRegister from "./modules/users/components/UserRegister";
import UserLogin from "./modules/users/components/UserLogin";
// import Dashboard from "./modules/profiles/components/Dashboard";
// import CreateProfile from "./modules/profiles/components/CreateProfile";
// import EditProfile from "./modules/profiles/components/EditProfile";
// import AddEducation from "./modules/profiles/components/AddEducation";
// import AddExperience from "./modules/profiles/components/AddExperience";
// import PostList from "./modules/posts/components/PostList";
// import PostDetails from "./modules/posts/components/PostDetails";

import Alert from "./layout/util/Alert";
import PrivateRoute from "./router/PrivateRoute";

import * as userActions from "./redux/users/user.actions";
import { UserUtil } from "./authUtil/UserUtil";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storageKey: string | null = UserUtil.getStorageKey();
    if (storageKey) {
      dispatch(userActions.getUserInfo());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Router>
        <Alert />
        <NavBar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<DeveloperList />} />
          <Route
            path="/developers/:developerId"
            element={<DeveloperDetails />}
          />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/login" element={<UserLogin />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            {/* <Route path="/profiles/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/profiles/create" element={<CreateProfile />} /> */}
            {/* <Route path="/profiles/edit/:profileId" element={<EditProfile />} /> */}
            {/* <Route path="/profiles/education" element={<AddEducation />} /> */}
            {/* <Route path="/profiles/experience" element={<AddExperience />} /> */}

            {/* <Route path="/posts/list" element={<PostList />} /> */}
            {/* <Route path="/posts/:postId" element={<PostDetails />} /> */}
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
