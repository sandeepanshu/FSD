import React from "react";
import type { UserInfo } from "./UserInfo";

interface IProps {
  userInfo: UserInfo;
}

const ComponentC: React.FC<IProps> = ({ userInfo }) => {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body bg-danger text-white">
                <p className="h4">Component C</p>
                <small>{JSON.stringify(userInfo)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComponentC;
