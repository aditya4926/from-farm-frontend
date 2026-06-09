import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            alert("Login Successful");

            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
                    Login 🌾
                </h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4">
                    New User? <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;