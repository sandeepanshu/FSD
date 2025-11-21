import React, { useState } from "react";
import ChildCard from "./ChildCard";

interface IState {
  pText: string;
  cText: string;
}

const ParentCard: React.FC = () => {
  const [parentState, setParentState] = useState<IState>({
    pText: "",
    cText: "",
  });

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentState({
      ...parentState,
      pText: event.target.value,
    });
  };

  const receiveData = (value: string): void => {
    setParentState({
      ...parentState,
      cText: value,
    });
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body rgba-blue-light text-white">
                  <div className="row">
                    <div className="col-md-4">
                      <form>
                        <div className="form-group">
                          <input
                            value={parentState.pText}
                            onChange={updateInput}
                            type="text"
                            className="form-control"
                            placeholder="Parent Text"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <small className="text-dark font-weight-bold">
                    {parentState.cText}
                  </small>
                  <ChildCard pText={parentState.pText} sendData={receiveData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParentCard;
