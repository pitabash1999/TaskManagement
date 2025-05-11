import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Authslice";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(login(formData));
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (token) return <Home />;

  return (
    <div className="h-screen bg-blue-500 dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden fixed inset-0">
      <div
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4"
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 text-center">
          LOGIN
        </h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="name"
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
