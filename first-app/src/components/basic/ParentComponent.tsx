import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

interface IState {
  pMessage: string;
  childMessage: string;
}

const ParentComponent: React.FC = () => {
  const [parentState, setParentState] = useState<IState>({
    pMessage: "Hello Iam from Parent",
    childMessage: "",
  });

  const receiveData = (value: string): void => {
    setParentState({
      ...parentState,
      childMessage: value,
    });
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body bg-success text-white">
                  <p className="h3">Parent Component</p>
                  <small>{parentState.pMessage}</small>
                  <br />
                  <small>{parentState.childMessage}</small>
                  <ChildComponent
                    message={parentState.pMessage}
                    sendData={receiveData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParentComponent;
