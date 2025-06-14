import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";
import EditProduct from "./pages/seller/EditProduct";
import AllUsers from "./pages/seller/AllUsers";
import About from "./components/About";
import Contact from "./components/Contact";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen  text-gray-700 bg-[#f1eee8] ">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      {isSeller ? <SellerDashboard /> : <Navigate to="/seller-login" />}

      <Toaster />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />

        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<ProductCategory />} />

        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/loader" element={<Loading />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/seller" element={<SellerLayout />}>
          <Route
            index
            element={isSeller ? <AddProduct /> : <Navigate to="/seller" />}
          />

          <Route element={<ProtectedSellerRoute />}>
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="all-users" element={<AllUsers />} />
          </Route>
        </Route>
      </Routes>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
