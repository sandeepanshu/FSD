import React, { useState } from 'react';

const AuthUser: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-body bg-light">
                  {!isLoggedIn ? (
                    <button className="btn btn-success btn-sm" onClick={login}>
                      Login
                    </button>
                  ) : (
                    <button className="btn btn-danger btn-sm" onClick={logout}>
                      Logout
                    </button>
                  )}
                  <h1>{isLoggedIn ? "Welcome User" : "Welcome Guest"}</h1>
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
