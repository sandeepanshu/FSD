import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";
 
function App() {
  

  return (
    <>
      <Router>
        <NavBar />
           <UserList/>

        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
