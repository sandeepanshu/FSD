import React from 'react';
import {NavLink} from 'react-router-dom';

interface IProps {}

let NavBar:React.FC<IProps> = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-primary navbar-expand-sm">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        <i className="fa fa-snowflake"/> React Routing
                    </NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/employees/list" className="nav-link">
                                    Employees
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
                        <ul className="navbar-nav d-flex align-items-end flex-row">
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
        </React.Fragment>
    )
}

export default NavBar;
