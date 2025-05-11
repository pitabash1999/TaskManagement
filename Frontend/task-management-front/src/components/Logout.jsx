import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { logout } from "../Redux/Authslice";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const { loggedIn, user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        {(!loading && loggedIn && user?.name) || "User"}{" "}
        {<RiArrowDropDownLine className="text-xl" />}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-slate-600 dark:bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm"
      >
        {user?.role === "ROLE_ADMIN" && (
          <li>
            <Link to={"/createTask"}>Create Task</Link>
            <hr />
          </li>
        )}

        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
