import React, { useState } from "react";

interface IProps {
  msg: string;
  time: string;
}

interface IState {
  count: number;
}

const Message: React.FC<IProps> = ({ msg, time }) => {
  const [countState, setCountState] = useState<IState>({
    count: 10,
  });

  const updateCount = () => {
    setCountState({
      count: countState.count + 1,
    });
  };

  return (
    <>
      <h2>Message Component</h2>
      <h2>{msg}</h2>
      <h2>{time}</h2>
      <hr />
      <p className="h1">{countState.count}</p>
      <button onClick={updateCount} className="btn btn-success btn-sm">
        Incr
      </button>
    </>
  );
};

export default Message;
