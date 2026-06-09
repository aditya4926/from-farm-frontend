import { useEffect, useState } from "react";
import api from "../api/axios";

function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                My Orders 📦
            </h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border p-4 rounded mb-4"
                >
                    <h2>
                        Product: {order.productId?.title}
                    </h2>

                    <p>
                        Price: ₹{order.productId?.price}
                    </p>

                    <p>
                        Farmer: {order.farmerId?.name}
                    </p>

                    <p>
                        Mobile: {order.farmerId?.mobile}
                    </p>

                    <p>
                        Quantity: {order.quantity}
                    </p>
                    <p className="text-green-600 font-bold">
                        Total Amount: ₹{order.totalAmount}
                    </p>

                    <p>
                        Status:
                        <span
                            className={
                                order.status === "Accepted"
                                    ? "text-green-600 font-bold"
                                    : order.status === "Rejected"
                                        ? "text-red-600 font-bold"
                                        : "text-yellow-600 font-bold"
                            }
                        >
                            {" "}
                            {order.status}
                        </span>
                    </p>
                    <p>
                        Ordered On:
                        {" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <a
                        href={`http://localhost:5000/api/orders/invoice/${order._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 text-white px-3 py-2 rounded inline-block mt-2"
                    >
                        Download Invoice PDF
                    </a>
                </div>
            ))}
        </div>
    );
}

export default MyOrders;