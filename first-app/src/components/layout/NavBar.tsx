import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <i className="fa fa-shopping-cart" />
          BigBasket
        </NavLink>

        <div className="collapse navbar-collapse">
          {/* Left Menu */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/products/list" className="nav-link">
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/stocks/list" className="nav-link">
                Stocks
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>

          {/* Right Menu */}
          <ul className="navbar-nav ms-auto flex-row gap-2">
            <li className="nav-item">
              <NavLink to="/products/admin" className="nav-link">
                Admin
              </NavLink>
            </li>
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
