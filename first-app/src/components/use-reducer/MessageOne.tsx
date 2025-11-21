import React, { useState } from "react";

const MessageOne: React.FC = () => {
  const [message, setMessage] = useState<string>("Hello");

  const sayGoodMorning = () => setMessage("Good Morning");
  const sayGoodAfternoon = () => setMessage("Good Afternoon");
  const sayGoodEvening = () => setMessage("Good Evening");

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <p className="h4">Using useState()</p>
                </div>

                <div className="card-body">
                  <p className="h3">{message}</p>

                  <button
                    onClick={sayGoodMorning}
                    className="btn btn-success btn-sm me-2"
                  >
                    Good Morning
                  </button>

                  <button
                    onClick={sayGoodAfternoon}
                    className="btn btn-warning text-white btn-sm me-2"
                  >
                    Good Afternoon
                  </button>

                  <button
                    onClick={sayGoodEvening}
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

export default MessageOne;
