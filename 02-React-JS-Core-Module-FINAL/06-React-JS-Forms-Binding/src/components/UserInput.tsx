import React, { useState } from "react";

const UserInput: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <h3>Change User Name</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <input
                        value={username}
                        onChange={changeInput}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </form>
                  <p className="h3">{username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserInput;
