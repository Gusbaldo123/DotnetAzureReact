import React from "react";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/pages/LoginPage";
import CoursePage from "./components/pages/CoursePage";
import StudentPage from "./components/pages/StudentPage";
import ProfessorPage from "./components/pages/ProfessorPage";

function AppRoutes()
{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Course" element={<CoursePage/>}/>
        <Route path="/Student" element={<StudentPage/>}/>
        <Route path="/Professor" element={<ProfessorPage/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;