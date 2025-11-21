import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthUser from "./components/AuthUser";
import Customers from "./components/Customers";
import EmployeeCards from "./components/EmployeeCards";
import HobbySelector from "./components/HobbySelector";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <AuthUser />
        <Customers />
        <EmployeeCards />
        <HobbySelector />
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
