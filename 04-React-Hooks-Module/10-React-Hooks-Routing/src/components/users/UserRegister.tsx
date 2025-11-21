import React from "react";
import { Link } from "react-router-dom";

const UserRegister: React.FC = () => {
  return (
    <>
      {/* HEADER SECTION */}
      <section className="py-4">
        <div className="container">
          <div className="row animate__animated animate__fadeInDown">
            <div className="col">
              <h3 className="text-primary mb-3">
                <i className="fas fa-user-shield me-2"></i>
                Registration
              </h3>
              <p className="text-muted">
                Create your new account to access member features and manage
                your dashboard seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="mb-5">
        <div className="container">
          <div className="row animate__animated animate__fadeInUp">
            <div className="col-md-8">
              <div className="card shadow-sm rounded-3">
                <div className="card-body p-4">
                  <form>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </div>

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
                        placeholder="Create a password"
                      />
                    </div>

                    <button className="btn btn-primary w-100 mt-2">
                      Register
                    </button>
                  </form>

                  <div className="mt-3 text-center">
                    <small>
                      Already have an account?{" "}
                      <Link to="/users/login" className="fw-bold text-success">
                        Login
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

export default UserRegister;
