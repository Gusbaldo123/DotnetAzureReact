//#region imports
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import UserManager from "../../utils/UserManager";
import RecoverPasswordManager from "../../utils/RecoverPasswordManager";

import "./RecoverPasswordPage.css"

import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Banner from "../../components/shared/Banner"

export default RecoverPasswordPage;
//#endregion

//#region Handlers
async function Recover(e, setResponse, isProcessing, setProcess) {
    e.preventDefault();
    if (isProcessing) return;
    setProcess(true);
    const email = e.target.elements.emailRecover.value.toLowerCase();
    await SendMail(email)
    setResponse(`Mail sent to '${email}'(May be on spam!)`);
    setProcess(false);
}
async function SendMail(email) {
    const res = await RecoverPasswordManager.sendMail(email);
    alert(res);
}
//#endregion

//#region JSX
function RecoverPasswordPage() {
    const navigate = useNavigate();
    const user = UserManager.getLocalUser();
    const [response, setResponse] = useState(null);
    const [isProcessing, setProcess] = useState(false);
    useEffect(() => {
        document.title = "Skillhub - Recover Password";

        if (user) navigate("/Home");
    }, [navigate]);

    return (<>
        <Header />
        <Banner />
        <section className="RecoverPasswordContent">
            <h2>Recover Password</h2>
            <form action="" method="post" onSubmit={async (e) => await Recover(e, setResponse, isProcessing, setProcess)}>
                <label htmlFor="emailRecover">Email: </label>
                <input type="email" name="emailRecover" id="emailRecover" />
                <input type="submit" value="Confirm" />
            </form>
            <Link className="btSignIn" to={{ pathname: "/login", search: "?form=signIn" }}>New account</Link>
            <Link className="btSignUp" to={{ pathname: "/login", search: "?form=signUp" }}>Log in</Link>
            <br />
            <p className="responseRecover">{response}</p>
        </section>
        <Footer />
    </>);
}
//#endregion