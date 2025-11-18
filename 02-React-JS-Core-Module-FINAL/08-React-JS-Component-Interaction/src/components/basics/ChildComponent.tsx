import React, { useState } from "react";

interface IProps {
  message: string;
  sendData: (value: string) => void;
}

const ChildComponent: React.FC<IProps> = ({ message, sendData }) => {
  const [cMessage] = useState<string>("Hello from Child");

  const clickButton = () => {
    sendData(cMessage);
  };

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-warning text-white">
                <p className="h3">Child Component</p>
                <small>{`From parent "${message}"`}</small>
                <br />
                <small>{cMessage}</small>
                <br />
                <button className="btn btn-light btn-sm" onClick={clickButton}>
                  Send to Parent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildComponent;
