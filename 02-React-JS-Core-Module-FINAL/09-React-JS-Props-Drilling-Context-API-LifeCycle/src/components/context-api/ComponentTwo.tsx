import React from "react";
import ComponentThree from "./ComponentThree";

const ComponentTwo: React.FC = () => {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-warning text-white">
                <p className="h4">Component Two</p>
                <small></small>
                <ComponentThree />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentTwo;
