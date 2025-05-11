import React, { useState, useRef, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import submit from "../assets/submit.png";
import Submission from "./Submission";
import { useDispatch, useSelector } from "react-redux";
import { assignTaskUser, deleteTaskbyId } from "../Redux/Taskslice";
import { getSubmittionByTaskId, submitTask } from "../Redux/Submissionslice";

const Task = ({ taskItem, fetchTaskSubmissions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, user } = useSelector((state) => state.auth);
  const { status, submissions } = useSelector((state) => state.submissions);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const role = user?.role;

  const [submitForm, setSubmitForm] = useState({
    gitHubLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitForm({
      ...submitForm,
      [name]: value,
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleUserClick = (taskId, userId) => {
    dispatch(assignTaskUser({ id: taskId, userId: userId }));
    setIsOpen(false);
  };

  const [showSubmittedMessage, setShowSubmittedMessage] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        submitTask({ taskId: taskItem.id, gitHubLink: submitForm.gitHubLink })
      ).unwrap();
      setShowSubmittedMessage(true);
      setTimeout(() => setShowSubmittedMessage(false), 3000); // hide after 3s
      navigate("/home");
    } catch (error) {
      setSubmitError(error.message && "Failed to submit task");
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (status === "failed") {
      setErrorMessage("Only admin can approve.");
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-4 m-2 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between w-full mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {taskItem.title}
        </h2>

        <div className="flex gap-1 items-center justify-center">
          {role === "ROLE_ADMIN" && (
            <button
              className="text-black hover:text-gray-700 dark:text-white text-xl rounded-md dark:hover:text-gray-400"
              aria-label="Edit task"
            >
              <Link to={`/updateTask/${taskItem.id}`}>
                <FaEdit />
              </Link>
            </button>
          )}

          {
            <button
              onClick={() => {
                {
                  fetchTaskSubmissions(taskItem.id);
                }
                document.getElementById("my_modal_2").showModal();
              }}
            >
              <img src={submit} className="w-4 h-4" alt="submission image" />
            </button>
          }
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
              {status === "loading" && (
                <p className="text-center text-black dark:text-white">
                  Loading....
                </p>
              )}
              {errorMessage && (
                <p className="text-center text-red-500">{errorMessage}</p>
              )}
              <div className="modal-box  md:p-4 space-y-3 h-80">
                {submissions.length > 0 ? (
                  submissions.map((items, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between md:mb-4 "
                    >
                      <Submission submitItem={items} />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-black dark:text-white text-center">
                    No submissions
                  </p>
                )}
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          {role === "ROLE_ADMIN" && (
            <button
              className="text-red-500 hover:text-red-700 text-2xl"
              aria-label="Delete task"
              onClick={() => {
                dispatch(deleteTaskbyId(taskItem.id));
              }}
            >
              <MdDeleteOutline />
            </button>
          )}

          {/* Dropdown container */}
          {role === "ROLE_ADMIN" && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-2xl text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400"
                onClick={toggleDropdown}
                aria-label="Assign user"
                aria-expanded={isOpen}
              >
                <MdOutlineAssignmentInd />
              </button>

              {isOpen && (
                <ul
                  className="absolute top-7 right-0 bg-white dark:bg-slate-700 p-2 
                rounded-md shadow-lg z-10 flex flex-col gap-1 min-w-[120px] border border-gray-200 dark:border-gray-600 overflow-auto h-36"
                >
                  {users?.map((user, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 p-1 px-2 rounded-md"
                      onClick={() => handleUserClick(taskItem.id, user.id)}
                    >
                      <div className="flex flex-col">
                        {user.name}
                        <br />
                        <span className="text-sm text-blue-400">
                          {user.email}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full mb-3 flex flex-col md:flex-row justify-evenly items-center">
        {taskItem.image && (
          <img
            src={taskItem.image}
            alt={taskItem.title}
            className="w-24 h-24 object-cover rounded-md"
          />
        )}
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {taskItem.description}
        </p>
      </div>

      <div className="flex flex-col justify-start items-start md:flex-row md:items-center md:justify-between w-full text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Created: {taskItem.creationDate}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          Due: {taskItem.deadLine}
        </span>

        {role === "ROLE_ADMIN" && (
          <span className="text-gray-500 dark:text-gray-400">
            Assigned:{" "}
            {taskItem?.assignedToId ? taskItem?.assignedToId : "Not assigned"}
          </span>
        )}

        {role === "ROLE_ADMIN" ? ( //checking status for admin
          <span className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm">
            {taskItem.status}
          </span>
        ) : (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("task_modal").showModal()}
            >
              Submit New Task
            </button>

            {/* Modal with form */}
            <dialog
              id="task_modal"
              className="modal modal-bottom sm:modal-middle"
            >
              {status === "loading" && <p>Loading</p>}
              <div className="modal-box p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl sm:text-2xl mb-4">
                    Submit New Task
                  </h3>

                  <button
                    onClick={() =>
                      document.getElementById("task_modal").close()
                    }
                    className="btn btn-sm btn-circle btn-ghost -mt-2 -mr-2"
                  >
                    ✕
                  </button>
                </div>
                {submitError && (
                  <p className="text-red-500 text-sm text-center mb-2">
                    {submitError}
                  </p>
                )}
                {status === "loading" && (
                  <p className="text-sm text-blue-400 text-center">
                    Submitting...
                  </p>
                )}

                {showSubmittedMessage && status !== "loading" && (
                  <p className="text-sm text-green-500 text-center">
                    Submitted
                  </p>
                )}

                <form
                  className="space-y-3 sm:space-y-4"
                  onSubmit={handleSubmitTask}
                >
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                      GitHub Link
                    </label>
                    <input
                      type="text"
                      placeholder="Enter GitHub link"
                      name="gitHubLink"
                      value={submitForm.gitHubLink}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition text-sm sm:text-base"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Click outside to close - better mobile handling */}
              <form method="dialog" className="modal-backdrop bg-black/50">
                <button>close</button>
              </form>
            </dialog>
          </div>
        )}
      </div>

      {/* printing tags for the project */}
      <div className="flex flex-row gap-4 justify-start mt-2">
        {taskItem.tags.map((tag) => (
          <span
            key={tag}
            className="text-gray-500 dark:text-gray-400 border px-2 rounded-lg 
          bg-white dark:bg-slate-600
          dark: border-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Task;
