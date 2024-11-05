import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function MenuClick()
{
  <Link  to={{pathname: '/home'}}>NavigateNow</Link>
}

function Header()
{
  return (
    <header className="siteHeader">
        <nav className="navHeader">
          <div className="navHeaderIcon">
            <Link className="iconHeader" to={{pathname: '/home'}}><img src="" alt="" /></Link>
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