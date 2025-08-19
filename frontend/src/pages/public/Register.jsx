// src/pages/public/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mockUsers } from "../../cluster/userData";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const exists = mockUsers?.find((u) => u.email === email);
    if (exists) {
      setError("User already exists with this email");
      return;
    }

    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role,
      bookings: [],
    };

    mockUsers.push(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    if (role === "admin") navigate("/admin");
    else if (role === "coach") navigate("/coach");
    else if (role === "groundOwner") navigate("/ground-owner");
    else navigate("/user");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="coach">Coach</option>
            <option value="groundOwner">Ground Owner</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
