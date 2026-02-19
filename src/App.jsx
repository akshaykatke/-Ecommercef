import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./colors.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./assets/Header";
import Breadcrumb from "./assets/Breadcrumb";
import Home from "./assets/Home";
import Signin from "./assets/Signin";
import Signup from "./assets/Signup";
import Cartitems from "./assets/Cartitems";
import PrivateRoute from "./assets/privateRoute";
import Dashboard from "./user/Dashboard";
import AdminRoute from "./assets/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import Product from "./admin/Product";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./user/orders";
import { Authprovider } from "./context/auth";
import { CartProvider } from "./context/cart";

function App() {
  return (
    <Authprovider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/cartitems" element={<Cartitems />} />
            <Route path="/Dashboard" element={<PrivateRoute />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/orders" element={<Orders />} />
            </Route>
            <Route path="/Dashboard" element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/createcategory" element={<CreateCategory />} />
              <Route path="admin/createproduct" element={<CreateProduct />} />
              <Route
                path="admin/update-product/:id"
                element={<UpdateProduct />}
              />
              <Route path="admin/products" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Authprovider>
  );
}
export default App;
