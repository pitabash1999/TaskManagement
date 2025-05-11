import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import NoTask from "./NoTask";
import NoTaskUser from "./NoTaskUser";
import { useEffect, useState } from "react";
import { getSubmittionByTaskId } from "../Redux/Submissionslice";

const Tasklist = () => {
  const { tasks, usersTask, loading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const showUsers = tasks.length !== 0 ? tasks : usersTask;

  const [activeTaskId, setActiveTaskId] = useState(null);

  // Fetch submissions when the submission modal mount
  useEffect(() => {
    if (activeTaskId) {
      dispatch(getSubmittionByTaskId({ taskId: activeTaskId }));
    }
  }, [activeTaskId, dispatch]);

  if (loading)
    return (
      <p className="flex items-center justify-center text-xl  text-black dark:text-white min-h-screen">
        Loading...
      </p>
    );

  if (user?.role === "ROLE_ADMIN" && (tasks ?? []).length === 0)
    return <NoTask />;

  if (user?.role === "ROLE_USER" && (usersTask ?? []).length === 0)
    return <NoTaskUser />;
  return (
    <div className="w-full h-screen flex justify-between bg-gray-100 dark:bg-gray-900 rounded-sm ">
      <div className="overflow-hidden h-screen w-full  overflow-y-auto">
        <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 m-2 overflow-hidden">
          <ul className=" flex flex-col-reverse space-y-2 ">
            {showUsers.map((task) => (
              <li
                key={task.id}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded"
              >
                <Task taskItem={task} fetchTaskSubmissions={setActiveTaskId} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasklist;
