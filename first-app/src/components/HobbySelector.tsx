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
                  {/* LEFT SIDE: CHECKBOXES */}
                  <div className="col-md-4">
                    <form>
                      <div className="form-check">
                        <input
                          id="eatCheck"
                          name="eating"
                          onChange={updateCheck}
                          checked={hobbyState.eating}
                          className="form-check-input"
                          type="checkbox"
                        />
                        <label className="form-check-label" htmlFor="eatCheck">
                          Eating
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          id="codeCheck"
                          name="coding"
                          onChange={updateCheck}
                          checked={hobbyState.coding}
                          className="form-check-input"
                          type="checkbox"
                        />
                        <label className="form-check-label" htmlFor="codeCheck">
                          Coding
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          id="sleepCheck"
                          name="sleeping"
                          onChange={updateCheck}
                          checked={hobbyState.sleeping}
                          className="form-check-input"
                          type="checkbox"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="sleepCheck"
                        >
                          Sleeping
                        </label>
                      </div>
                    </form>
                  </div>

                  {/* RIGHT SIDE: CARDS */}
                  <div className="col-md-8">
                    {hobbyState.eating && (
                      <div className="card my-2 animate__animated animate__jello">
                        <div className="card-body bg-success text-white">
                          <p className="h3">Eating</p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                          </p>
                        </div>
                      </div>
                    )}

                    {hobbyState.coding && (
                      <div className="card my-2 animate__animated animate__jello">
                        <div className="card-body bg-warning text-white">
                          <p className="h3">Coding</p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                          </p>
                        </div>
                      </div>
                    )}

                    {hobbyState.sleeping && (
                      <div className="card my-2 animate__animated animate__jello">
                        <div className="card-body bg-danger text-white">
                          <p className="h3">Sleeping</p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
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
  );
};

export default HobbySelector;
