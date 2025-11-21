import React, { useState } from "react";

interface IProps {}
interface IState {
  isLoggedIn: boolean;
}

const AuthUser: React.FC<IProps> = () => {
  const [authState, setAuthState] = useState<IState>({
    isLoggedIn: false,
  });

  const login = () => {
    setAuthState({
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
    });
  };

  return (
    <React.Fragment>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-body bg-light">
                  {!authState.isLoggedIn ? (
                    <button className="btn btn-success btn-sm" onClick={login}>
                      Login
                    </button>
                  ) : (
                    <button className="btn btn-danger btn-sm" onClick={logout}>
                      LogOut
                    </button>
                  )}
                  {authState.isLoggedIn ? (
                    <h1>Welcome User</h1>
                  ) : (
                    <h1>Welcome Guest</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AuthUser;
