import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header()
{
  const iconWebsite = require("../../assets/IconSH.png");
  return (
    <header className="siteHeader">
        <nav className="navHeader">
          <div className="navHeaderIcon">
            <Link className="iconHeader" to={{pathname: '/home'}}><img src={iconWebsite} alt="iconWebsite" /></Link>
          </div>
          <div className="navHeaderButtons">
            <Link className="btSignIn" to={{pathname: '/login'}}>Sign In</Link>
            <Link className="btSignUp" to={{pathname: '/login'}}>Sign Up</Link>
          </div>
        </nav>
      </header>
  );
}

export default Header;