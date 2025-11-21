import React from "react";
import { Link } from "react-router-dom";

const UserLogin: React.FC = () => {
  return (
    <>
      {/* HEADER SECTION */}
      <section className="py-4">
        <div className="container">
          <div className="row animate__animated animate__fadeInDown">
            <div className="col">
              <h3 className="text-primary mb-3">
                <i className="fas fa-user-shield me-2"></i>
                Login
              </h3>
              <p className="text-muted">
                Access your account and explore your dashboard. Enter your
                credentials to continue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN FORM */}
      <section className="pb-5">
        <div className="container">
          <div className="row animate__animated animate__fadeInUp">
            <div className="col-md-8">
              <div className="card shadow-sm rounded-3">
                <div className="card-body p-4">
                  <form>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                      />
                    </div>

                    <button className="btn btn-primary w-100 mt-2">
                      Login
                    </button>
                  </form>

                  <div className="mt-3 text-center">
                    <small>
                      Don’t have an account?{" "}
                      <Link
                        to="/users/register"
                        className="fw-bold text-success"
                      >
                        Register
                      </Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserLogin;
