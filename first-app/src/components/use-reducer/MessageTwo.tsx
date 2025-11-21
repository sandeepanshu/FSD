import React, { useReducer } from "react";

interface IState {
  message: string;
}

const initialState: IState = {
  message: "Hello",
};

// 🔥 Strongly typed actions
type ActionType = { type: "gm" } | { type: "ga" } | { type: "ge" };

// Reducer
const reducer = (state: IState, action: ActionType): IState => {
  switch (action.type) {
    case "gm":
      return { message: "Good Morning" };
    case "ga":
      return { message: "Good Afternoon" };
    case "ge":
      return { message: "Good Evening" };
    default:
      return state;
  }
};

const MessageTwo: React.FC = () => {
  const [messageState, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-warning text-white">
                  <p className="h4">Using useReducer()</p>
                </div>

                <div className="card-body">
                  <p className="h3">{messageState.message}</p>

                  <button
                    onClick={() => dispatch({ type: "gm" })}
                    className="btn btn-success btn-sm me-2"
                  >
                    Good Morning
                  </button>

                  <button
                    onClick={() => dispatch({ type: "ga" })}
                    className="btn btn-warning  text-white btn-sm me-2"
                  >
                    Good Afternoon
                  </button>

                  <button
                    onClick={() => dispatch({ type: "ge" })}
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

export default MessageTwo;
