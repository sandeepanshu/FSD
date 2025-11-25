import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ContactApp from "./components/ContactApp";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ContactApp />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
