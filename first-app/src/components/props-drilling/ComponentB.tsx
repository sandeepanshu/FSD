import React from "react";
import ComponentC from "./ComponentC";
import type { UserInfo } from "./UserInfo";

interface IProps {
  userInfo: UserInfo;
}

const ComponentB: React.FC<IProps> = ({ userInfo }) => {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-warning text-white">
                <p className="h4">Component B</p>
                <small>{JSON.stringify(userInfo)}</small>

                {/* Passing Props Down */}
                <ComponentC userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentB;
