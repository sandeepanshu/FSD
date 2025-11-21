import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Message from "./components/Message";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Message msg="Good Morning" time="10 AM" />
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
