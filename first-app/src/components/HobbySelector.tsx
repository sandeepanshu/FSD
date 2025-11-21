import React, { useState } from "react";

interface IState {
  eating: boolean;
  coding: boolean;
  sleeping: boolean;
}

const HobbySelector: React.FC = () => {
  const [hobbyState, setHobbyState] = useState<IState>({
    eating: false,
    coding: false,
    sleeping: false,
  });

  const updateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setHobbyState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(this.state)}</pre>*/}
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <p className="h3">Hobby Selector</p>
                </div>
                <div className="card-body bg-light">
                  <div className="row">
                    <div className="col-md-4">
                      <form>
                        <div className="form-check">
                          <input
                            name="eating"
                            onChange={updateCheck}
                            checked={hobbyState.eating}
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Eating
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            name="coding"
                            onChange={updateCheck}
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Coding
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            name="sleeping"
                            onChange={updateCheck}
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Sleeping
                          </label>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-8">
                      {hobbyState.eating && (
                        <div className="card my-2 animate__animated animate__jello">
                          <div className="card-body bg-success text-white">
                            <p className="h3">Eating</p>
                            <p className="card-text text-white">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Iusto, magnam.
                            </p>
                          </div>
                        </div>
                      )}
                      {hobbyState.coding && (
                        <div className="card my-2 animate__animated animate__jello">
                          <div className="card-body bg-warning text-white">
                            <p className="h3">Coding</p>
                            <p className="card-text text-white">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Iusto, magnam.
                            </p>
                          </div>
                        </div>
                      )}
                      {hobbyState.sleeping && (
                        <div className="card my-2 animate__animated animate__jello">
                          <div className="card-body bg-danger text-white">
                            <p className="h3">Sleeping</p>
                            <p className="card-text text-white">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Iusto, magnam.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HobbySelector;
