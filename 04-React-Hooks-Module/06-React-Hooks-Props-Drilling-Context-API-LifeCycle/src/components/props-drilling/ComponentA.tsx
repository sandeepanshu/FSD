import React from "react";
import type { UserInfo } from "./UserInfo";
import ComponentB from "./ComponentB";

interface IProps {
  userInfo: UserInfo;
}

const ComponentA: React.FC<IProps> = ({ userInfo }) => {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-info text-white">
                <p className="h4">Component A</p>
                <small>{JSON.stringify(userInfo)}</small>
                <ComponentB userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentA;
