import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { createTask } from "../Redux/Taskslice";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
    deadLine: new Date(),
  });

  const [load, setLoad] = useState(false);

  const techOptions = [
    { value: "react", label: "React" },
    { value: "springboot", label: "Springboot" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
  ];

  //To handle changes in the input box
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      // Basic client-side validation
      if (!formData.title.trim()) {
        throw new Error("Title is required");
      }

      // Dispatch and wait for the action to complete
      await dispatch(createTask(formData)).unwrap();

      // Reset form only on success
      setFormData({
        title: "",
        description: "",
        image: "",
        tags: [],
        deadline: null,
      });

      navigate("/home");
    } catch (error) {
      setLocalError(error.message || "Failed to create task");
    } finally {
      setLoad(false);
    }
  };

  //to handle the tag changes
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#2d3748" : "#1a202c", // dark bg
      borderColor: state.isFocused ? "#4a5568" : "#2d3748",
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#2d3748", // dark menu bg
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

  return (
    <div className="h-screen bg-blue-500 dark:bg-gray-900 flex items-center justify-center p-4 ">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 text-center">
          Create Task
        </h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="title"
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Technologies
            </label>
            <Select
              isMulti
              name="technologies"
              options={techOptions}
              onChange={handleTechChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select technologies..."
              styles={customStyles}
            />
          </div>
          <div className="relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Image
            </label>
            <input
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              id="file_input"
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
            {load ? "Creating...." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
