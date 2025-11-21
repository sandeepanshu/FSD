import React, { useState } from "react";

interface IProps {}
interface IState {
  username: string;
}

const UserInput: React.FC<IProps> = () => {
  const [userState, setUserState] = useState<IState>({
    username: "",
  });

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({
      username: event.target.value,
    });
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
                        value={userState.username}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </form>
                  <p className="h3">{userState.username}</p>
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
