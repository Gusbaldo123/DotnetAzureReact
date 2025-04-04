//#region imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserManager from "../../utils/UserManager";

import "./RecoverPasswordPage.css"

import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Banner from "../../components/shared/Banner"

export default RecoverPasswordPage;
//#endregion

//#region Handlers
function Recover(e, setResponse) {
    e.preventDefault();
    const email = e.target.elements.emailRecover.value.toLowerCase();
    SendMail(email)
    setResponse(`Mail sent to '${email}'(May be on spam!)`);
}
function SendMail(email)
{
    
}
//#endregion

//#region JSX
function RecoverPasswordPage() {
    const navigate = useNavigate();
    const user = UserManager.getLocalUser();
    const [response, setResponse] = useState(null);
    useEffect(() => {
        document.title = "Skillhub - Recover Password";

        if (user) navigate("/Home");
    }, [navigate]);

    return (<>
        <Header />
        <Banner />
        <section className="RecoverPasswordContent">
            <h2>Recover Password</h2>
            <form action="" method="post" onSubmit={(e)=>Recover(e,setResponse)}>
                <label htmlFor="emailRecover">Email: </label>
                <input type="email" name="emailRecover" id="emailRecover" />
                <input type="submit" value="Confirm" />
            </form>
            <br />
            <p className="responseRecover">{response}</p>
        </section>
        <Footer />
    </>);
}
//#endregion