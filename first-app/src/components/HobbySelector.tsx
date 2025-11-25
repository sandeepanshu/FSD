import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEating,
  checkCoding,
  checkSleeping,
} from "../redux/hobby-selector/hobby-selector.slice";
import type { RootState } from "../redux/store";

const HobbySelector: React.FC = () => {
  const dispatch = useDispatch();
  const hobbyState = useSelector((state: RootState) => state.hobby);

  return (
    <>
      <section className="py-4 bg-light border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold text-primary">🎯 Hobby Selector</h2>
          <p className="text-muted">
            Select your hobbies and see their descriptions instantly.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-secondary text-white text-center rounded-top-4">
                  <h4 className="mb-0">Choose Your Hobbies</h4>
                </div>

                <div className="card-body bg-light">
                  <div className="row">
                    {/* Checkbox Column */}
                    <div className="col-md-4">
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          checked={hobbyState.eating}
                          onChange={() => dispatch(checkEating())}
                          className="form-check-input"
                          id="hobbyEating"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="hobbyEating"
                        >
                          Eating
                        </label>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          checked={hobbyState.coding}
                          onChange={() => dispatch(checkCoding())}
                          className="form-check-input"
                          id="hobbyCoding"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="hobbyCoding"
                        >
                          Coding
                        </label>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          checked={hobbyState.sleeping}
                          onChange={() => dispatch(checkSleeping())}
                          className="form-check-input"
                          id="hobbySleeping"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="hobbySleeping"
                        >
                          Sleeping
                        </label>
                      </div>
                    </div>

                    {/* Result Cards */}
                    <div className="col-md-8">
                      {hobbyState.eating && (
                        <div className="card my-2 shadow-sm border-0 animated fadeIn animate__animated animate__jello">
                          <div className="card-body bg-success text-white rounded-3">
                            <h4>🍽️ Eating</h4>
                            <p>
                              Enjoying delicious food is always relaxing and
                              fun!
                            </p>
                          </div>
                        </div>
                      )}

                      {hobbyState.coding && (
                        <div className="card my-2 shadow-sm border-0 animated fadeIn animate__animated animate__jello">
                          <div className="card-body bg-warning text-white rounded-3">
                            <h4>💻 Coding</h4>
                            <p>
                              Creating amazing software and solving problems
                              creatively.
                            </p>
                          </div>
                        </div>
                      )}

                      {hobbyState.sleeping && (
                        <div className="card my-2 shadow-sm border-0 animated fadeIn animate__animated animate__jello">
                          <div className="card-body bg-danger text-white rounded-3">
                            <h4>😴 Sleeping</h4>
                            <p>
                              Resting well helps recharge your mind and body!
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
