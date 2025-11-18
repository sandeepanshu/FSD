import "./App.css";
import AuthUser from "./components/AuthUser";
import Customers from "./components/Customers";
import EmployeeCards from "./components/EmployeeCards";
import Footer from "./components/Footer";
import HobbySelector from "./components/HobbySelector";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <AuthUser />
      <HobbySelector />
      <EmployeeCards />
      <Customers />
      <Footer />
    </>
  );
}

export default App;
