import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import GithubProfileSearchApp from "./components/github/GithubProfileSearchApp";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <GithubProfileSearchApp />
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
