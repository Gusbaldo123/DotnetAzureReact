import React from "react";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import CoursePage from "./Pages/CoursePage/CoursePage";
import StudentPage from "./Pages/StudentPage/StudentPage";
import ProfessorPage from "./Pages/ProfessorPage/ProfessorPage";
import HomePage from "./Pages/HomePage/HomePage";

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