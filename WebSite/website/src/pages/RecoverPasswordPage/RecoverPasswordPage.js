//#region imports
import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

import UserManager from "../../utils/UserManager";

import "./RecoverPasswordPage.css"

import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Banner from "../../components/shared/Banner"

export default RecoverPasswordPage;
//#endregion

//#region JSX
function RecoverPasswordPage()
{
    const navigate = useNavigate();
    const user = UserManager.getLocalUser();
    useEffect(() => {
        document.title = "Recover Password";

        if(user) navigate("/Home");
      }, [navigate]);
    
    return(<>
    <Header/>
    <Banner/>
    <section className="RecoverPasswordContent">
        <h2>Recover Password</h2>
        <form action="" method="post">
            <label htmlFor="emailRecover">Email: </label>
            <input type="email" name="emailRecover" id="emailRecover" />
            <input type="submit" value="Confirm" />
        </form>
        <br />
        <p className="responseRecover"></p>
    </section>
    <Footer/>
    </>);
}
//#endregion