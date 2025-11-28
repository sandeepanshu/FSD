import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Counter from "./components/Counter";
import WishMessage from "./components/WishMessage";
import DigitalWatch from "./components/DigitalWatch";
import ProductItem from "./components/ProductItem";
import ShoppingCart from "./components/ShoppingCart";
import Registration from "./components/Registration";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Box sx={{ p: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Hello
        </Button>

        <Button variant="contained" color="secondary">
          Hello
        </Button>
      </Box>
      <Counter />
      <WishMessage />
      <DigitalWatch />
      <ProductItem />
      <ShoppingCart />
      <Registration />
      <Routes>{/* your routes */}</Routes>
    </BrowserRouter>
  );
}

export default App;
