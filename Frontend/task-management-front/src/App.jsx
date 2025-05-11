import React, { useEffect } from "react";
import RoutesHub from "./components/RoutesHub";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask, fetchUsersTask } from "./Redux/Taskslice";
import { getUserProfile, getUsersList } from "./Redux/Authslice";

const App = () => {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);
  // 1. Fetch user profile when token is available
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!token || !user) return;

    if (user?.role === "ROLE_ADMIN") {
      dispatch(fetchTask({}));
      dispatch(getUsersList(token));
    } else if (user?.role === "ROLE_USER") {
      dispatch(fetchUsersTask({ userId: user.id }));
    }
  }, [dispatch, token, user]);

  return (
    <>
      <div>
        <RoutesHub />
      </div>
    </>
  );
};

export default App;
