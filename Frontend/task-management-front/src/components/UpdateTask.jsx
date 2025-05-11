import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchTaskId, updateTask } from "../Redux/Taskslice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const param = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { taskDetails, loading } = useSelector((state) => state.task);

  const [load, setLoad] = useState(false);
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
    deadLine: new Date(),
  });

  // Options for tags
  const techOptions = [
    { value: "react", label: "React" },
    { value: "springboot", label: "Springboot" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "Angular", label: "Angular" },
    { value: "Vue", label: "Vue" },
  ];

  // Fetch task data
  useEffect(() => {
    if (param) {
      dispatch(fetchTaskId(param));
    }
  }, [dispatch, param]);

  // Populate formData when taskDetails is loaded
  useEffect(() => {
    if (taskDetails && Object.keys(taskDetails).length > 0) {
      setFormData({
        title: taskDetails.title || "",
        description: taskDetails.description || "",
        image: "",
        tags: taskDetails.tags || [],
      });
    }
  }, [taskDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechChange = (selectedOptions) => {
    setFormData({
      ...formData,
      tags: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleDate = (e) => {
    setFormData({
      ...formData,
      deadLine: formatDateForBackend(e.target.value),
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      await dispatch(
        updateTask({ id: param, updatedTaskData: formData })
      ).unwrap();
      navigate("/home");
    } catch (error) {
      setLocalError(error.message && "Failed to update task");
    } finally {
      setLoad(false);
    }
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
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#4a5568",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      ":hover": {
        backgroundColor: "#c53030",
        color: "white",
      },
    }),
  };

  function formatDateForInput(date) {
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function formatDateForBackend(date) {
    const d = new Date(date);
    const pad = (n, len = 2) => n.toString().padStart(len, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());
    const milliseconds = pad(d.getMilliseconds(), 3);
    const microseconds = (milliseconds + "000").slice(0, 6); // to get 6 digits
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}`;
  }

  if (!taskDetails || Object.keys(taskDetails).length === 0) {
    return (
      <div className="text-white text-center mt-10">
        Loading task details...
      </div>
    );
  }

  return (
    <div className="h-screen bg-blue-500 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 text-center">
          Update Task
        </h2>
        {localError && (
          <p className="text-red-500 text-sm text-center mb-2">{localError}</p>
        )}
        <form className="space-y-3 sm:space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Technologies
            </label>
            <Select
              isMulti
              name="technologies"
              options={techOptions}
              value={techOptions.filter((option) =>
                formData.tags.includes(option.value)
              )}
              onChange={handleTechChange}
              placeholder="Select technologies..."
              styles={customStyles}
            />
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image
            </label>
            <input
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              type="text"
              placeholder="Give image address"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Deadline
            </label>
            <input
              type="datetime-local"
              name="deadLine"
              value={
                formData.deadLine ? formatDateForInput(formData.deadLine) : ""
              }
              onChange={handleDate}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 pr-10"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition text-sm sm:text-base"
          >
            {load ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
