import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <UserList />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
