import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Registration from "./components/register/Registration";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        {/* <UserInput /> */}
        {/* <SMSApp /> */}
        <Registration />
        <Routes>

        </Routes>
      </Router>
    </>
  );
}

export default App;
