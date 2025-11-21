import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ParentComponent from "./components/basic/ParentComponent";
import ParentCard from "./components/intermediate/ParentCard";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <ParentComponent />
          <ParentCard/>
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
