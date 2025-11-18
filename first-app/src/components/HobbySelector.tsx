import React, { useState } from "react";

const HobbySelector: React.FC = () => {
  const [hobbies, setHobbies] = useState({
    eating: false,
    coding: false,
    sleeping: false,
  });

  const updateCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHobbies({
      ...hobbies,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      {/* <pre>{JSON.stringify(hobbies)}</pre> */}
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
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckEating"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckEating"
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
                            id="flexCheckCoding"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckCoding"
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
                            id="flexCheckSleeping"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckSleeping"
                          >
                            Sleeping
                          </label>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-8">
                      {hobbies.eating && (
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
                      {hobbies.coding && (
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
                      {hobbies.sleeping && (
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
    </>
  );
};

export default HobbySelector;
