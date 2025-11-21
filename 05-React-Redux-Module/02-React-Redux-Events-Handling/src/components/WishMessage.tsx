import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sayGoodMorning,
  sayGoodAfternoon,
  sayGoodEvening,
} from "../redux/wish-message/wish-message.slice";
import type { RootState } from "../redux/store";

const WishMessage: React.FC = () => {
  const dispatch = useDispatch();

  const messageState = useSelector((state: RootState) => state.msg);

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3>{messageState.message}</h3>

                <button
                  onClick={() => dispatch(sayGoodMorning())}
                  className="btn btn-success btn-sm me-2"
                >
                  Good Morning
                </button>

                <button
                  onClick={() => dispatch(sayGoodAfternoon())}
                  className="btn btn-warning btn-sm me-2"
                >
                  Good Afternoon
                </button>

                <button
                  onClick={() => dispatch(sayGoodEvening())}
                  className="btn btn-danger btn-sm"
                >
                  Good Evening
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishMessage;
