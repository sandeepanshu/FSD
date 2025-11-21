import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PizzaHut from "./components/PizzaHut";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <PizzaHut/>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
