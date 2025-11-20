import React, { useContext } from "react";
import UserContext from "./UserContext";

const ComponentThree: React.FC = () => {
  const userInfo = useContext(UserContext); // ⬅ modern context usage

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-danger text-white">
                <p className="h4">Component Three</p>
                <small>{JSON.stringify(userInfo)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentThree;
