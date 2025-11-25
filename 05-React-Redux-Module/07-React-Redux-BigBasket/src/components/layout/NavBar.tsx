import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-success navbar-expand-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <i className="fa fa-shopping-cart" /> BigBasket
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/products/list"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products/admin"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold" : ""}`
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
