import React from "react";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";

const RoutesHub = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/updateTask/:id" element={<UpdateTask />} />

        {/* Add a catch-all route if needed */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default RoutesHub;
