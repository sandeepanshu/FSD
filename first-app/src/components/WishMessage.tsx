import React, { useState } from "react";

const WishMessage: React.FC = () => {
  const [msg, setMsg] = useState("Hello");

  const sayGoodMorning = () => {
    setMsg("Good Morning");
  };

  const sayGoodAfternoon = (value: string) => {
    setMsg(value);
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h3>{msg}</h3>

                  <button
                    onClick={sayGoodMorning}
                    className="btn btn-success btn-sm me-2"
                  >
                    Good Morning
                  </button>

                  <button
                    onClick={() => sayGoodAfternoon("Good Afternoon")}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Good Afternoon
                  </button>

                  <button
                    onClick={() => setMsg("Good Evening")}
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
