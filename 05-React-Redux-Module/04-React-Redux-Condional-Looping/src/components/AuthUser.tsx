import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../redux/auth-user/auth-user.slice";
import type { RootState } from "../redux/store";

const AuthUser: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <section className="py-4 bg-light border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold text-primary">Authentication Panel</h2>
          <p className="text-muted">
            Manage user authentication state using Redux Toolkit.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body text-center p-5">
                  {/* Login / Logout Button */}
                  {!isLoggedIn ? (
                    <button
                      className="btn btn-success px-4 py-2 rounded-3 mb-3"
                      onClick={() => dispatch(loginUser())}
                    >
                      <i className="fas fa-sign-in-alt me-2"></i> Login
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger px-4 py-2 rounded-3 mb-3"
                      onClick={() => dispatch(logoutUser())}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  )}

                  {/* Status Message */}
                  <h3 className="fw-bold mt-3">
                    {isLoggedIn ? (
                      <span className="text-success">Welcome User 👋</span>
                    ) : (
                      <span className="text-secondary">Welcome Guest 🙂</span>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthUser;
