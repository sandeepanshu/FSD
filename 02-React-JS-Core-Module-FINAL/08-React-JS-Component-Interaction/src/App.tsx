import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ParentComponent from "./components/basics/ParentComponent";
import ParentCard from "./components/intermediate/ParentCard";

function App() {
  return (
    <>
      <NavBar />
      {/* Basics  */}
      <ParentComponent />

      {/* Intermediate */}
      <ParentCard />
      <Footer />
    </>
  );
}

export default App;
