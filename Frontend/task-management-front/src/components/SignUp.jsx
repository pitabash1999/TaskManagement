import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/Authslice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "USER", label: "USER" },
  ];

  const handleRoleChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedOption ? "ROLE_" + selectedOption.value : "",
    }));
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
      borderColor: state.isFocused ? "#4a5568" : "#2d3748",
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#2d3748",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#4a5568" : "#2d3748",
      color: "white",
    }),
    singleValue: (base) => ({ ...base, color: "white" }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/login");
    } catch (err) {
      // Attempt to extract a readable error message
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";

      setError(errorMessage);
    }
  };

  return (
    <div className="h-screen bg-blue-500 dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden fixed inset-0">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          SIGN UP
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter username"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Role
            </label>
            <Select
              name="role"
              options={roles}
              onChange={handleRoleChange}
              styles={customStyles}
              placeholder="Select role..."
              className="text-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500 dark:text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {"Username or email is already taken"}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
