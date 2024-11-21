//#region imports
import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

import UserManager from "../../utils/UserManager.js";

export default Header;
//#endregion

function Header() {

  //#region Handlers
  function LogoffClickHandler(navigate,SetUser) {
    SetUser(null);
    UserManager.setLocalUser(null);
    alert("Logged off successfully")
    navigate("/Home");
  }
  //#endregion
  
  //#region Components
  function RenderLoginButtons({ user, navigate, SetUser }) {
    return user == null ? //if unlogged, return login/signup buttons
      <div className="navHeaderButtons">
        <Link className="btSignIn" to={{ pathname: "/login", search: "?form=signIn" }}>Sign In</Link>
        <Link className="btSignUp" to={{ pathname: "/login", search: "?form=signUp" }}>Sign Up</Link>
      </div>
      : // if logged, return account/logoff buttons
      <div className="navHeaderButtons">
        <Link className="btUser" to={{ pathname: "/Account" }}>{user.Firstname}</Link>
        <button className="btLogOff" onClick={() => LogoffClickHandler(navigate,SetUser)}>LogOff</button>
      </div>
  }
  //#endregion

  const [user, SetUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = UserManager.getLocalUser();
    SetUser(localUser);
  }, []);

  //#region JSX
  return (
    <header className="siteHeader">
      <nav className="navHeader">
        <div className="navHeaderIcon">
          <Link className="iconHeader" to={{ pathname: '/Home' }}>
            <img src={require("../../assets/IconSH.png")} alt="iconWebsite" />
          </Link>
        </div>
        <RenderLoginButtons user={user} navigate={navigate} SetUser={SetUser}/>
      </nav>
    </header>
  );
  //#endregion
}
