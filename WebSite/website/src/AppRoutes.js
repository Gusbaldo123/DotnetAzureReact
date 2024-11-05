import React from "react";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import CoursePage from "./pages/CoursePage/CoursePage";
import ProfessorPage from "./pages/ProfessorPage/ProfessorPage";
import StudentPage from "./pages/StudentPage/StudentPage";

function AppRoutes()
{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Course" element={<CoursePage/>}/>
        <Route path="/Student" element={<StudentPage/>}/>
        <Route path="/Professor" element={<ProfessorPage/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;