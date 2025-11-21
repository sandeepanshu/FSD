import { BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        {/* <WishMessage/> */}
        {/* <ProductItem /> */}
        <ShoppingCart />
        <Routes>

        </Routes>
      </Router>
    </>
  );
}

export default App;
