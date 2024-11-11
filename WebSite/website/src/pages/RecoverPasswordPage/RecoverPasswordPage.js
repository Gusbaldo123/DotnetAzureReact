import React from "react";

import "./RecoverPasswordPage.css"

import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Banner from "../../components/shared/Banner"


function RecoverPasswordPage()
{
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

export default RecoverPasswordPage;