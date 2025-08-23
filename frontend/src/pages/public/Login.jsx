// src/pages/public/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error: authError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.state?.from;

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const user = mockUsers?.find(
  //     (u) => u.email === email && u.password === password
  //   );

  //   const moduleName = path && path.split("/").at(-2) || 'login'
  //   console.log("moduleName: ", moduleName)

  //   if (!user) {
  //     setError("Invalid email or password");
  //     return;
  //   }

  //   localStorage.setItem("user", JSON.stringify(user));

  //   // if (user.role === "admin") navigate("/admin");
  //   // else if (user.role === "coach") navigate("/coach");
  //   // else if (user.role === "groundOwner") navigate("/ground-owner");
  //   // else navigate("/user-dashboard");
  //   if(moduleName) {
  //     navigate(`{/${user?.role}${path}}`)
  //   } else {
  //     navigate(`{/${user?.role}/dashboard}`)
  //   }
  //   // if(user?.role) navigate(`{${user?.role}${location.state.from}}`)
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user && user.role) {
      const moduleName = path?.split("/")?.at(-2) || null;
      const targetPath = moduleName ? `/${user.role}${path}` : `/${user.role}/dashboard`;
      if (window.location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [user, navigate, path]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
