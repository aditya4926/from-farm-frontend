import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    role: "",
    village: "",
    taluka: "",
    district: "",
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
      const { data } = await api.post(
        "/auth/register",
        formData
      );

      console.log(data);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="p-5">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          onChange={handleChange}
        />

        <input
          type="text"
          name="taluka"
          placeholder="Taluka"
          onChange={handleChange}
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          onChange={handleChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 block"
        >
          <option value="farmer">Farmer</option>
          <option value="customer">Customer</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;