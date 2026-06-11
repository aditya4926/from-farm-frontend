import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  const submitReview = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await api.post(
        `/products/${id}/review`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added");

      fetchProduct();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  if (!product) {
    return <h2 className="p-8">Loading...</h2>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-6">
        {product.title}
      </h1>

      <p className="text-green-600 text-2xl font-bold mt-2">
        ₹{product.price}/{product.unit}
      </p>
      <h2 className="text-2xl font-bold mt-8">
        Reviews
      </h2>

      {product?.reviews?.map((review) => (
        <div
          key={review._id}
          className="border p-3 rounded mt-3"
        >
          <h3 className="font-bold">
            {review.name}
          </h3>

          <p>⭐ {review.rating}/5</p>

          <p>{review.comment}</p>
        </div>
      ))}

      <p className="mt-3">
        Quantity: {product.quantity} {product.unit}
      </p>

      <p className="mt-4">
        {product.description}
      </p>

      <div className="border-t mt-6 pt-6">
        <h2 className="text-2xl font-bold mb-3">
          Farmer Details 👨‍🌾
        </h2>

        <p>Name: {product.farmerId?.name}</p>

        <p>Mobile: {product.farmerId?.mobile}</p>

        <p>
          Location:
          {" "}
          {product.farmerId?.village},
          {" "}
          {product.farmerId?.taluka},
          {" "}
          {product.farmerId?.district}
        </p>
        <h2 className="text-2xl font-bold mt-8">
          Add Review
        </h2>
        <p>
          Lat: {product.farmerId?.location?.latitude}
        </p>
        <p>
          Lng: {product.farmerId?.location?.longitude}
        </p>
        <Link
          to={`/chat/${product.farmerId?._id}`}
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded mt-3"
        >
          💬 Chat with Farmer
        </Link>
        {product.farmerId?.location && (
          <a
            href={`https://www.google.com/maps?q=${product.farmerId.location.latitude},${product.farmerId.location.longitude}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-3"
          >
            📍 View Farmer Location
          </a>
        )}


        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
          className="border p-2"
        >
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Write Review..."
          className="border p-3 w-full mt-2"
        />

        <button
          onClick={submitReview}
          className="bg-green-600 text-white px-4 py-2 rounded mt-3"
        >
          Submit Review
        </button>

        <div className="flex gap-4 mt-5">

          <a
            href={`tel:${product.farmerId?.mobile}`}
            className="bg-green-600 text-white px-5 py-3 rounded"
          >
            📞 Call Farmer
          </a>

          <a
            href={`https://wa.me/91${product.farmerId?.mobile}`}
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 text-white px-5 py-3 rounded"
          >
            💬 WhatsApp
          </a>


        </div>
      </div>

    </div>
  );
}

export default ProductDetails;