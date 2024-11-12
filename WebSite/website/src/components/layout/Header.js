import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

function Header() {
  // Configuração do redirecionamento
  const navigate = useNavigate();

  function LogOffClick(navigate) {
    localStorage.setItem("localUser", "");
    alert("Logged off successfully")
    navigate("/home");
  }

  const iconWebsite = require("../../assets/IconSH.png");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("localUser"));
  } catch {
    user = null;
  }

  return (
    <header className="siteHeader">
      <nav className="navHeader">
        <div className="navHeaderIcon">
          <Link className="iconHeader" to={{ pathname: '/home' }}>
            <img src={iconWebsite} alt="iconWebsite" />
          </Link>
        </div>
        {
          user == null ?
            <div className="navHeaderButtons">
              <Link className="btSignIn" to={{ pathname: "/login", search: "?form=signIn" }}>Sign In</Link>
              <Link className="btSignUp" to={{ pathname: "/login", search: "?form=signUp" }}>Sign Up</Link>
            </div>
            :
            <div className="navHeaderButtons">
              <Link className="btUser" to={{ pathname: "/account" }}>{user.Surname}</Link>
              <button className="btLogOff" onClick={() => LogOffClick(navigate)}>LogOff</button>
            </div>
        }
      </nav>
    </header>
  );
}

export default Header;
