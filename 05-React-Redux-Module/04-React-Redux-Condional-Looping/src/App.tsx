import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthUser from "./components/AuthUser";
import EmployeeCards from "./components/EmployeeCards";
import HobbySelector from "./components/HobbySelector";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AuthUser/>
      <EmployeeCards/>
      <HobbySelector/>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
