import React, { useState } from "react";

const Welcome: React.FC = () => {
  const [msg] = useState("Good Morning");

  return (
    <>
      <h1>Welcome component</h1>
      <h3>{msg}</h3>
    </>
  );
};

export default Welcome;
