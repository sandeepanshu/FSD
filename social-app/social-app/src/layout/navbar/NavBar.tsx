import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../redux/users/user.actions";
import type { RootState } from "../../redux/rootReducer";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  // Select from Redux store
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.userKey
  );

  const handleLogout = () => {
    dispatch(userActions.logOutUser());
  };

  return (
    <nav className="navbar navbar-dark bg-teal navbar-expand-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <i className="fa fa-code" /> React Social
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/developers" className="nav-link">
                <i className="fa fa-users" /> Developers
              </NavLink>
            </li>
          </ul>

          <div className="d-flex">
            <ul className="navbar-nav">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/users/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/users/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/posts/list" className="nav-link">
                      <i className="fa fa-list" /> Posts
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/profiles/dashboard" className="nav-link">
                      <i className="fa fa-sitemap" /> Dashboard
                    </NavLink>
                  </li>

                  {user && user.avatar && (
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          width={25}
                          height={25}
                          className="rounded-circle"
                        />{" "}
                        {user.name}
                      </NavLink>
                    </li>
                  )}

                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
