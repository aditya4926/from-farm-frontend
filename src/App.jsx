import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddProduct from "./Pages/AddProduct";
import MyProducts from "./Pages/MyProducts";
import EditProduct from "./Pages/EditProduct";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import FarmerOrders from "./Pages/FarmerOrders";
import MyOrders from "./Pages/MyOrders";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Notifications from "./Pages/Notifications";
import Wishlist from "./Pages/Wishlist";
import Chat from "./Pages/Chat";
import MyChats from "./Pages/MyChats";
import NearbyProducts from "./Pages/NearbyProducts";
import NearbyMap from "./Pages/NearbyMap";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUsers from "./Pages/AdminUsers";
import AdminProducts from "./Pages/AdminProducts";

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
      <Route path="/chat/:userId" element={<Chat />} />
      <Route path="/my-chats" element={<MyChats />} />
      <Route path="/nearby-products"element={<NearbyProducts />}/>
      <Route path="/nearby-map" element={<NearbyMap />}/>
      <Route path="/admin-dashboard" element={<AdminDashboard />}/>
      <Route path="/admin-users" element={<AdminUsers />} />
      <Route path="/admin-products"element={<AdminProducts />}/>
    </Routes>
  );
}


export default App;