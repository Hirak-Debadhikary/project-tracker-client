import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
// import Home from "./Home";
import ProjectListing from "../Pages/ProjectListing";
import Project from "../Pages/Project";
import Login from "../Pages/Login";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<ProjectListing />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
