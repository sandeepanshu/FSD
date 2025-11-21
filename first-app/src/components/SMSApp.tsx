import React, { useState } from "react";

interface IProps {}
interface IState {
  text: string;
  charCount: number;
  maxCount: number;
}

const SMSApp: React.FC<IProps> = () => {
  const [appState, setAppState] = useState<IState>({
    text: "",
    charCount: 100,
    maxCount: 100,
  });

  const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppState({
      ...appState,
      text: event.target.value,
      charCount: appState.maxCount - event.target.value.length,
    });
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(this.state)}</pre>*/}
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
                      value={appState.text}
                      onChange={updateText}
                      maxLength={appState.maxCount}
                      rows={4}
                      className="form-control"
                      placeholder="Your Text Here"
                    />
                  </form>
                </div>
                <div className="card-footer">
                  <p className="h3">
                    The Characters Remaining :
                    <span className="font-weight-bold">
                      {appState.charCount}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SMSApp;
