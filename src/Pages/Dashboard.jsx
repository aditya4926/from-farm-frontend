import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [revenue, setRevenue] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);
    const fetchRevenue = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/orders/revenue",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRevenue(data.totalRevenue);
        } catch (error) {
            console.log(error);
        }
    };
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        outOfStock: 0,
    });
    const [orderStats, setOrderStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        acceptedOrders: 0,
        rejectedOrders: 0,
    });
    useEffect(() => {
        fetchStats();
        fetchOrderStats();
        fetchRevenue();
        fetchNotificationCount();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/products/dashboard/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStats(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchOrderStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/orders/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrderStats(data);
        } catch (error) {
            console.log(error);
        }
    };
    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };
    const fetchNotificationCount = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/notifications/count",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNotificationCount(data.count);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-green-600">
                Welcome {user?.name} 🌾
            </h1>

            <p className="mt-4">Mobile: {user?.mobile}</p>

            <p className="mb-6">Role: {user?.role}</p>

            <div className="flex gap-4">

                {user?.role === "farmer" && (
                    <>
                        <Link
                            to="/add-product"
                            className="bg-green-600 text-white px-5 py-3 rounded"
                        >
                            Add Product
                        </Link>

                        <Link
                            to="/my-products"
                            className="bg-blue-600 text-white px-5 py-3 rounded"
                        >
                            My Products
                        </Link>
                       

                        <Link
                            to="/farmer-orders"
                            className="bg-yellow-500 text-white px-5 py-3 rounded"
                        >
                            Farmer Orders
                        </Link>
                        <div className="bg-green-100 p-4 rounded">
                            <h3>Total Products</h3>
                            <p className="text-2xl font-bold">
                                {stats.totalProducts}
                            </p>
                        </div>

                        <div className="bg-blue-100 p-4 rounded">
                            <h3>Active Products</h3>
                            <p className="text-2xl font-bold">
                                {stats.activeProducts}
                            </p>
                        </div>

                        <div className="bg-yellow-100 p-4 rounded">
                            <h3>Out Of Stock</h3>
                            <p className="text-2xl font-bold">
                                {stats.outOfStock}
                            </p>
                        </div>
                        <Link
                            to="/my-chats"
                            className="bg-purple-600 text-white px-5 py-3 rounded"
                        >
                            💬 My Chats
                        </Link>


                    </>
                )}

                {user?.role === "farmer" && (
                    <div className="grid md:grid-cols-4 gap-4 mt-8">

                        <div className="bg-blue-100 p-4 rounded">
                            <h3>Total Orders</h3>
                            <p className="text-2xl font-bold">
                                {orderStats.totalOrders}
                            </p>
                        </div>

                        <div className="bg-yellow-100 p-4 rounded">
                            <h3>Pending</h3>
                            <p className="text-2xl font-bold">
                                {orderStats.pendingOrders}
                            </p>
                        </div>

                        <div className="bg-green-100 p-4 rounded">
                            <h3>Accepted</h3>
                            <p className="text-2xl font-bold">
                                {orderStats.acceptedOrders}
                            </p>
                        </div>

                        <div className="bg-red-100 p-4 rounded">
                            <h3>Rejected</h3>
                            <p className="text-2xl font-bold">
                                {orderStats.rejectedOrders}
                            </p>
                        </div>
                        <div className="bg-green-200 p-4 rounded">
                            <h3>Total Revenue</h3>
                            <p className="text-2xl font-bold">
                                ₹{revenue}
                            </p>

                        </div>
                        <Link
                            to="/notifications"
                            className="bg-red-500 text-white px-5 py-3 rounded"
                        >
                            🔔 Notifications ({notificationCount})
                        </Link>

                    </div>
                )}

                {user?.role === "customer" && (
                    <>
                        <button onClick={() => navigate("/wishlist")}>
                            ❤️ Wishlist
                        </button>
                        <Link
                            to="/products"
                            className="bg-purple-600 text-white px-5 py-3 rounded"
                        >
                            Marketplace
                        </Link>

                        <Link
                            to="/my-orders"
                            className="bg-indigo-600 text-white px-5 py-3 rounded"
                        >
                            My Orders
                        </Link>
                        <Link
                            to="/my-chats"
                            className="bg-purple-600 text-white px-5 py-3 rounded"
                        >
                            💬 My Chats
                        </Link>
                        <Link
                            to="/nearby-products"
                            className="bg-green-700 text-white px-5 py-3 rounded"
                        >
                            📍 Nearby Farmers
                        </Link>
                        <Link
                            to="/nearby-map"
                            className="bg-blue-600 text-white px-5 py-3 rounded"
                        >
                            🗺️ Nearby Farmers Map
                        </Link>


                    </>
                )}
                <Link
                    to="/profile"
                    className="bg-gray-600 text-white px-5 py-3 rounded"
                >
                    Profile
                </Link>
                <button
                    onClick={logoutHandler}
                    className="bg-red-600 text-white px-5 py-3 rounded"
                >
                    Logout
                </button>
                {user.role === "admin" && (
                    <>
                        <Link
                            to="/admin-dashboard"
                            className="bg-black text-white px-6 py-3 rounded mr-3"
                        >
                            👨‍💼 Admin Dashboard
                        </Link>

                        <Link
                            to="/admin-users"
                            className="bg-blue-600 text-white px-6 py-3 rounded"
                        >
                            👥 Manage Users
                        </Link>
                    </>
                )}

            </div>

        </div>

    );
}

export default Dashboard;