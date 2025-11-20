import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Employees */}
          <Route path="/employees/list" element={<Employees />} />
          <Route path="/employees/:employeeId" element={<EmployeeDetails />} />

          {/* Stocks */}
          <Route path="/stocks/list" element={<Stocks />} />

          {/* Users */}
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/login" element={<UserLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
