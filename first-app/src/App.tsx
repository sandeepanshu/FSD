import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import ProductList from "./components/products/ProductList";
import ProductAdmin from "./components/products/ProductAdmin";
import CreateProduct from "./components/products/CreateProduct";
import UpdateProduct from "./components/products/UpdateProduct";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Product List */}
        <Route path="/products/list" element={<ProductList />} />

        {/* Admin page */}
        <Route path="/products/admin" element={<ProductAdmin />} />

        {/* Create Product */}
        <Route path="/products/create" element={<CreateProduct />} />

        {/* Update Product */}
        <Route path="/products/:productId" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
