import React, { useState } from "react";

const SMSApp: React.FC = () => {
  const maxCount = 200;
  const [text, setText] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(maxCount);

  const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);
    setCharCount(maxCount - value.length);
  };

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h3>SMS App</h3>
                </div>
                <div className="card-body">
                  <form>
                    <textarea
                      value={text}
                      onChange={updateText}
                      maxLength={maxCount}
                      rows={4}
                      className="form-control"
                      placeholder="Your Text Here"
                    />
                  </form>
                </div>
                <div className="card-footer">
                  <p className="h3">
                    The Characters Remaining:{" "}
                    <span className="font-weight-bold">{charCount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SMSApp;
