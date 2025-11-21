import React, { useState } from "react";

interface IProps {}

interface IState {
  message: string;
}

const WishMessage: React.FC<IProps> = () => {
  const [messageState, setMessageState] = useState<IState>({
    message: "Hello",
  });

  const sayGoodMorning = () => {
    setMessageState({
      message: "Good Morning",
    });
  };

  const sayGoodAfternoon = (value: string) => {
    setMessageState({
      message: value,
    });
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h3>{messageState.message}</h3>
                  <button
                    onClick={sayGoodMorning}
                    className="btn btn-success btn-sm me-2"
                  >
                    Good Morning
                  </button>
                  <button
                    onClick={sayGoodAfternoon.bind(this, "Good Afternoon")}
                    className="btn btn-warning btn-sm me-2 text-white"
                  >
                    Good Afternoon
                  </button>
                  <button
                    onClick={() => setMessageState({ message: "Good Evening" })}
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
    </>
  );
};

export default WishMessage;
