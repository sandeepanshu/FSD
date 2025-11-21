import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import ProductList from "./components/products/models/productList/ProductList";
import ProductAdmin from "./components/products/ProductAdmin";
import CreateProduct from "./components/products/CreateProduct";
import UpdateProduct from "./components/products/UpdateProduct";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/list" element={<ProductList />} />
        <Route path="/products/admin" element={<ProductAdmin />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:productId" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
