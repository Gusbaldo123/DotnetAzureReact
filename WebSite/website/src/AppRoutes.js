import React from "react";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage/RecoverPasswordPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import CoursePage from "./pages/CoursePage/CoursePage";

function AppRoutes()
{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/Recover" element={<RecoverPasswordPage/>}/>
        <Route path="/Account" element={<AccountPage/>}/>
        <Route path="/Course" element={<CoursePage/>}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;