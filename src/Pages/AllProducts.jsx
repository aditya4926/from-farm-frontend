import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [orderQty, setOrderQty] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("COD");
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    const placeOrder = async (product) => {
        try {
            const token = localStorage.getItem("token");

            const quantity = Number(
                orderQty[product._id]
            );

            const amount =
                quantity * product.price;

            const { data } = await api.post(
                "/orders/create-payment-order",
                {
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const options = {
                key:
                    "rzp_test_Sz4oYF1zVO8L2J",

                amount: data.amount,

                currency: "INR",

                name: "From Farm",

                description:
                    "Product Purchase",

                order_id: data.id,

                handler: async function (
                    response
                ) {
                    await api.post(
                        "/orders",
                        {
                            productId: product._id,
                            quantity,
                            paymentMethod: "ONLINE",
                            paymentStatus: "Paid",
                            razorpayOrderId:
                                response.razorpay_order_id,

                            razorpayPaymentId:
                                response.razorpay_payment_id,

                            paymentStatus: "Paid",
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    alert(
                        "Payment Successful & Order Placed"
                    );
                },
            };

            const razor =
                new window.Razorpay(options);

            razor.open();
        } catch (error) {
            console.log(error);
        }


    };
    const placeCODOrder = async (product) => {
        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/orders",
                {
                    productId: product._id,
                    quantity: Number(orderQty[product._id]),
                    paymentMethod: "COD",
                    paymentStatus: "Pending",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("COD Order Placed Successfully");

        } catch (error) {
            console.log(error);
        }
    };
    
    
    const filteredProducts = products.filter((product) => {
        const matchSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "All" ||
            product.category === category;

        return matchSearch && matchCategory;
        if (Number(qty) > product.quantity) {
            return alert(
                `Only ${product.quantity} ${product.unit} available`
            );
        }
    });
    const addToWishlist = async (
        productId
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/wishlist",
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(
                "Added to Wishlist ❤️"
            );

        } catch (error) {

            alert(
                error.response?.data?.message
            );

        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-green-600 mb-6">
                All Products 🌾
            </h1>
            
            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 rounded w-full"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded"
                >
                    <option value="All">All</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                </select>

            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 shadow"
                    >
                        <img
                            src={product.image || "https://via.placeholder.com/300"}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded"
                        />

                        <h2 className="text-xl font-bold mt-3">
                            {product.title}
                        </h2>

                        <p>Category: {product.category}</p>

                        <p className="text-green-600 font-bold">
                            ₹{product.price}/{product.unit}
                        </p>

                        <p>
                            Quantity: {product.quantity} {product.unit}
                        </p>
                        <div className="mt-2">
                            <label>
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                Cash On Delivery
                            </label>

                            <br />

                            <label>
                                <input
                                    type="radio"
                                    value="ONLINE"
                                    checked={paymentMethod === "ONLINE"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                Online Payment
                            </label>
                        </div>

                        <p className="mt-2">
                            {product.description}
                        </p>
                        <p>
                            ⭐ {product.averageRating?.toFixed(1)}
                        </p>

                        <div className="mt-3 border-t pt-3">
                            <p className="font-semibold">
                                Farmer: {product.farmerId?.name}
                            </p>

                            <p>
                                📞 {product.farmerId?.mobile}
                            </p>

                            <p>
                                📍 {product.farmerId?.village},
                                {" "}
                                {product.farmerId?.taluka}
                            </p>
                        </div>
                        <Link
                            to={`/product/${product._id}`}
                            className="block text-center bg-green-600 text-white py-2 rounded mt-4"
                        >
                            View Details
                        </Link>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter Quantity"
                            value={orderQty[product._id] || ""}
                            onChange={(e) =>
                                setOrderQty({
                                    ...orderQty,
                                    [product._id]: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full mt-3"
                        />
                        <button
                            onClick={() => addToWishlist(product._id)}
                            className="bg-pink-500 text-white px-4 py-2 rounded mt-3 w-full"
                        >
                            ❤️ Add To Wishlist
                        </button>
                        <button
                            onClick={() => {

                                if (paymentMethod === "ONLINE") {
                                    placeOrder(product);
                                } else {
                                    placeCODOrder(product);
                                }

                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                        >
                            Place Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllProducts;