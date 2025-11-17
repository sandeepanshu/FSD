import "./App.css";
import CardSection from "./components/CardSection";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <LandingPage />
      <Intro />
      <CardSection />
      <Footer />
    </>
  );
}

export default App;
