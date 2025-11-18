import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Registration from "./components/Registration";
import SMSApp from "./components/SMSApp";
import UserInput from "./components/UserInput";

function App() {
  return (
    <>
      <NavBar />
      {/* Main Content */}
      <UserInput />
      <SMSApp />
      <Registration />
      <Footer />
    </>
  );
}

export default App;
