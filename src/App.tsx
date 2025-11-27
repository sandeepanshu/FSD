/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./modules/layout/components/navbar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alert from "./modules/layout/components/alert/Alert";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "./redux/store";
import { getUserInfo } from "./redux/users/user.slice";
import Home from "./modules/layout/components/home/Home";
import Footer from "./modules/layout/components/footer/Footer";
import MensCollection from "./modules/products/components/mens-collection/MensCollection";
import UserLogin from "./modules/users/components/user-login/UserLogin";
import UserRegister from "./modules/users/components/user-reigster/UserRegister";
import UserProfile from "./modules/users/components/user-profile/UserProfile";
import PrivateRoute from "./router/PrivateRoute";
import KidsCollection from "./modules/products/components/kids-collection/KidsCollection";
import WomensCollection from "./modules/products/components/womens-collection/WomensCollection";
import UploadProduct from "./modules/products/components/upload-product/UploadProduct";
import ProductDetails from "./modules/products/components/product-details/ProductDetails";
import Cart from "./modules/orders/components/cart/Cart";
import OrderList from "./modules/orders/components/order-list/OrderList";
import CheckOut from "./modules/orders/components/checkout/CheckOut";
import OrderSuccess from "./modules/orders/components/order-success/OrderSuccess";
import { AuthUtil } from "./util/AuthUtil";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (AuthUtil.isLoggedIn()) {
      dispatch(getUserInfo());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/men" element={<MensCollection />} />
          <Route path="/products/kids" element={<KidsCollection />} />
          <Route path="/products/women" element={<WomensCollection />} />
          <Route
            path="/products/upload"
            element={
              <PrivateRoute>
                <UploadProduct />
              </PrivateRoute>
            }
          />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route
            path="/orders/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/list"
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/checkout"
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/success"
            element={
              <PrivateRoute>
                <OrderSuccess />
              </PrivateRoute>
            }
          />
          <Route path="/users/login" element={<UserLogin />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route
            path="/users/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
