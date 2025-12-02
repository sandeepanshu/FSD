import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="wrapper">
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <h5 className="display-4">React Social App</h5>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            amet aperiam architecto autem commodi cupiditate, dicta distinctio
            enim et eum eveniet facere itaque iure laborum libero magnam modi
            necessitatibus nihil.
          </p>

          <div className="mt-3">
            <Link
              to="/users/register"
              className="btn btn-light text-teal btn-sm me-2"
            >
              Register
            </Link>

            <Link to="/users/login" className="btn btn-teal text-white btn-sm">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
