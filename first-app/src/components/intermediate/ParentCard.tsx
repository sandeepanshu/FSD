import React, { useState } from "react";
import ChildCard from "./ChildCard";

const ParentCard: React.FC = () => {
  const [pText, setPText] = useState<string>("");
  const [cText, setCText] = useState<string>("");

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPText(event.target.value);
  };

  const receiveData = (value: string) => {
    setCText(value);
  };

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body rgba-blue-light text-white">
                <div className="row">
                  <div className="col-md-4">
                    <form>
                      <div className="form-group">
                        <input
                          value={pText}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Parent Text"
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {/* Show Child Input Message */}
                <small className="text-dark font-weight-bold">{cText}</small>

                {/* Send Parent text + callback to child */}
                <ChildCard pText={pText} sendData={receiveData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentCard;
