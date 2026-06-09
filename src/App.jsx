import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import FarmerOrders from "./pages/FarmerOrders";
import MyOrders from "./Pages/MyOrders";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Notifications from "./Pages/Notifications";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/my-products" element={<MyProducts />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/farmer-orders" element={<FarmerOrders />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/Wishlist" element={<Wishlist />} />
    </Routes>
  );
}


export default App;