import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import WishMessage from "./components/WishMessage";
import ProductItem from "./components/ProductItem";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <WishMessage />
      <ProductItem />
      <ShoppingCart />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
