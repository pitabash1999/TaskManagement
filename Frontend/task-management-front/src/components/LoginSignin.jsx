import { Link } from "react-router-dom";

const LoginSignin = () => {
  return (
    <div className="flex space-x-4 rtl:space-x-reverse">
      <li>
        <Link
          to={"/login"}
          className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
          aria-current="page"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to={"/signup"}
          className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Signup
        </Link>
      </li>
    </div>
  );
};

export default LoginSignin;
