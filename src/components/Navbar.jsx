import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/dashboard" className="text-2xl font-bold text-green-600">
        From Farm 🌾
      </Link>

      <div className="flex gap-4 items-center">
        {user.role === "customer" && (
          <>
            <Link to="/products" className="hover:text-green-600">
              Marketplace
            </Link>
            <Link to="/my-orders" className="hover:text-green-600">
              My Orders
            </Link>
            <Link to="/wishlist" className="hover:text-green-600">
              Wishlist
            </Link>
            <Link to="/nearby-products" className="hover:text-green-600">
              Nearby
            </Link>
            <Link to="/my-chats" className="hover:text-green-600">
              Chats
            </Link>
          </>
        )}

        {user.role === "farmer" && (
          <>
            <Link to="/add-product" className="hover:text-green-600">
              Add Product
            </Link>
            <Link to="/my-products" className="hover:text-green-600">
              My Products
            </Link>
            <Link to="/farmer-orders" className="hover:text-green-600">
              Orders
            </Link>
            <Link to="/notifications" className="hover:text-green-600">
              Notifications
            </Link>
            <Link to="/my-chats" className="hover:text-green-600">
              Chats
            </Link>
          </>
        )}

        {user.role === "admin" && (
          <>
            <Link to="/admin-dashboard" className="hover:text-green-600">
              Admin
            </Link>
            <Link to="/admin-users" className="hover:text-green-600">
              Users
            </Link>
            <Link to="/admin-products" className="hover:text-green-600">
              Products
            </Link>
          </>
        )}

        <Link
          to="/profile"
          className="bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
        >
          Profile
        </Link>

        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;