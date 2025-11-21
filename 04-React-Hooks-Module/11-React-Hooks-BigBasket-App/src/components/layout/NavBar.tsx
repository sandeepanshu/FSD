import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success">
      <div className="container">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand fw-bold">
          <i className="fa fa-shopping-cart me-2" />
          BigBasket
        </NavLink>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#bbNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="bbNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/products/list"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "fw-bold text-white" : ""}`
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products/admin"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "fw-bold text-white" : ""}`
                }
              >
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
