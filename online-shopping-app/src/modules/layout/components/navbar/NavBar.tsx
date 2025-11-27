import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import brandImage from "../../../../assets/img/brandImage.png";
import { AuthUtil } from "../../../../util/AuthUtil";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";
import { logoutUser } from "../../../../redux/users/user.slice";
import { type AppDispatch, type RootState } from "../../../../redux/store";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.users
  );

  const { cartItems } = useSelector((state: RootState) => state.orders);

  const handleLogOut = () => {
    AuthUtil.logout();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-4-strong sticky-top"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        {/* BRAND */}
        <NavLink to="/" className="navbar-brand fw-bold">
          <img
            src={brandImage}
            alt="ShopHub"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          <span className="brand-text">ShopHub</span>
        </NavLink>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/products/men"
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active-nav-link" : ""}`
                }
              >
                <i className="fas fa-male me-1"></i> Men's Wear
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products/women"
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active-nav-link" : ""}`
                }
              >
                <i className="fas fa-female me-1"></i> Women's Wear
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products/kids"
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? "active-nav-link" : ""}`
                }
              >
                <i className="fas fa-child me-1"></i> Kids Wear
              </NavLink>
            </li>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/products/upload"
                    className={({ isActive }) =>
                      `nav-link px-3 ${isActive ? "active-nav-link" : ""}`
                    }
                  >
                    <i className="fas fa-upload me-1"></i> Upload
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/orders/list"
                    className={({ isActive }) =>
                      `nav-link px-3 ${isActive ? "active-nav-link" : ""}`
                    }
                  >
                    <i className="fas fa-receipt me-1"></i> Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* RIGHT SECTION */}
          <div className="d-flex align-items-center">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {/* CART ICON */}
              {isAuthenticated && (
                <li className="nav-item me-3 position-relative">
                  <NavLink
                    to="/orders/cart"
                    className="nav-link position-relative cart-icon-link"
                  >
                    <i className="fas fa-shopping-cart fa-lg"></i>

                    {cartItems.length > 0 && (
                      <span
                        className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {cartItems.length}
                      </span>
                    )}
                  </NavLink>
                </li>
              )}

              {/* GUEST BUTTONS */}
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/users/login" className="nav-link px-3">
                      <i className="fas fa-sign-in-alt me-1"></i> Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/users/register"
                      className="btn btn-light btn-sm ms-2 px-4"
                      style={{ borderRadius: "20px" }}
                    >
                      <i className="fas fa-user-plus me-1"></i> Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {isAuthenticated && user && user._id && (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle d-flex align-items-center px-3"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={
                            user.avatar?.startsWith("http")
                              ? user.avatar
                              : `https:${user.avatar}`
                          }
                          alt="User Avatar"
                          width="32"
                          height="32"
                          className="rounded-circle me-2 border border-2 border-light"
                        />

                        <span className="d-none d-md-inline">{user.name}</span>
                      </a>

                      <ul
                        className="dropdown-menu dropdown-menu-end shadow-4-strong"
                        aria-labelledby="userDropdown"
                      >
                        <li>
                          <NavLink
                            to="/users/profile"
                            className="dropdown-item"
                          >
                            <i className="fas fa-user me-2"></i> My Profile
                          </NavLink>
                        </li>

                        <li>
                          <hr className="dropdown-divider" />
                        </li>

                        <li>
                          <button
                            onClick={handleLogOut}
                            className="dropdown-item text-danger"
                          >
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  )}
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
