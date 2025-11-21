import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ContactApp from "./components/contact-app/ContactApp";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <ContactApp />
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
