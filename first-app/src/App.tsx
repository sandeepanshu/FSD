import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ImageSelect from "./components/use-ref/ImageSelect";
import Register from "./components/use-ref/Register";
import MessageOne from "./components/use-reducer/MessageOne";
import MessageTwo from "./components/use-reducer/MessageTwo";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ImageSelect />
      <Register />
      <MessageOne />
      <MessageTwo />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
