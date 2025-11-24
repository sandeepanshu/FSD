import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Registration from "./components/register/Registration";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Registration />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
