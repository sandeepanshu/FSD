import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent: React.FC = () => {
  const [pMessage] = useState<string>("Hello I am from Parent");
  const [childMessage, setChildMessage] = useState<string>("");

  const receiveData = (value: string) => {
    setChildMessage(value);
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
                  <small>{pMessage}</small>
                  <br />
                  <small>{childMessage}</small>
                  <ChildComponent message={pMessage} sendData={receiveData} />
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
