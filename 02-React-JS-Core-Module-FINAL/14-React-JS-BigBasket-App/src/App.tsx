import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import UserRegister from "./components/users/UserRegister";
import UserLogin from "./components/users/UserLogin";
import ProductList from "./products/ProductList";
import ProductAdmin from "./products/ProductAdmin";
import UpdateProduct from "./products/UpdateProduct";
import CreateProduct from "./products/CreateProduct";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/list" element={<ProductList />} />

          <Route path="/products/admin" element={<ProductAdmin />} />

          <Route path="/products/create" element={<CreateProduct />} />

          <Route path="/products/:productId" element={<UpdateProduct />} />

          {/* Users */}
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/login" element={<UserLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
