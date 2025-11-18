import React, { useState } from "react";

interface IProps {
  pText: string;
  sendData: (value: string) => void;
}

const ChildCard: React.FC<IProps> = ({ pText, sendData }) => {
  const [cText, setCText] = useState<string>("");

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCText(value);
    sendData(value); // send child → parent
  };

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body rgba-red-light text-white">
                <div className="row">
                  <div className="col-md-4">
                    <form>
                      <div className="form-group">
                        <input
                          value={cText}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Child Text"
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {/* Show Parent Text */}
                <small className="text-dark font-weight-bold">{pText}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildCard;
