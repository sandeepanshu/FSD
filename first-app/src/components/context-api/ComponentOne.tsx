import React from "react";
import ComponentTwo from "./ComponentTwo";

const ComponentOne: React.FC = () => {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-info text-white">
                <p className="h4">Component One</p>
                <small></small>
                <ComponentTwo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentOne;
