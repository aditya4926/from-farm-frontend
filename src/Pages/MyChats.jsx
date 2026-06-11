import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function MyChats() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchChatUsers();
  }, []);

  const fetchChatUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Chats 💬
      </h1>

      {users.length === 0 ? (
        <p>No chats yet</p>
      ) : (
        users.map((user) => (
          <Link
            key={user._id}
            to={`/chat/${user._id}`}
            className="block border p-4 rounded mb-3 hover:bg-gray-100"
          >
            <h2 className="font-bold">{user.name}</h2>
            <p>{user.mobile}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </Link>
        ))
      )}
    </div>
  );
}

export default MyChats;