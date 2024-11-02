import React from "react";

import "./Header.css";

function Header()
{
  return (
    <header className="siteHeader">
        <nav className="navHeader">
          <div className="navHeaderIcon">
            <button className="iconHeader"><img src="" alt="" /></button>
          </div>
          <div className="navHeaderButtons">
            <button className="btSignIn">Sign In</button>
            <button className="btSignUp">Sign Up</button>
          </div>
        </nav>
      </header>
  );
}

export default Header;