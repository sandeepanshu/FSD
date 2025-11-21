import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Employees from "./components/employees/Employees";
import Stocks from "./components/stocks/Stocks";
import UserRegister from "./components/users/UserRegister";
import UserLogin from "./components/users/UserLogin";
import About from "./components/layout/About";
import EmployeeDetails from "./components/employees/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/employees/list" element={<Employees />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetails />} />

        <Route path="/stocks/list" element={<Stocks />} />

        <Route path="/users/register" element={<UserRegister />} />
        <Route path="/users/login" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
