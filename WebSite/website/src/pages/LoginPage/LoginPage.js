import React from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./LoginPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

function LogInForm()
{
  return(
    <>
    <form action="Get" className="formLogin">
      <h2>Log In</h2>
      <div><label htmlFor="lblEmail">Email</label>
      <input type="text" name="lblEmail" id="lblEmail" className="lblEmail"/></div>
      <div><label htmlFor="lblPass">Password</label>
      <input type="password" name="lblPass" id="lblPass" className="lblPass"/></div>
    <button type="submit">LogIn</button>
    <a href="">Forgot your password?</a>
    <Link className="btSignUp" to={{ pathname: "/login", search: "?form=signUp" }}>Don't have a account?</Link>
    </form></>
  );
}
function SignUpForm()
{
  return(
    <>
    <form action="Post" className="formSignUp">
      <h2>SignUp</h2>
      <div>
        <label htmlFor="lblEmail">Email</label>
        <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" placeholder="email@email.com" required/></div>
      <div>
        <label htmlFor="lblPass">Password</label>
        <input type="password" name="lblPass" id="lblPass" className="lblPass" required/>
      </div>
        <hr />
        <h3>Informations</h3>
      <div>
        <label htmlFor="lblName">First Name</label>
        <input type="text" name="lblName" id="lblName" className="lblName" placeholder="ex.: John" required/>
      </div>
      <div>
        <label htmlFor="lblSurname">Surname</label>
        <input type="text" name="lblSurname" id="lblSurname" className="lblSurname" placeholder="ex.: Smith"  required/>
      </div>
      <div>
        <label htmlFor="lblPhone">Phone</label>
        <input type="text" name="lblPhone" id="lblPhone" className="lblPhone" placeholder="+000 000 000" required/>
      </div>
    <button type="submit">Register</button>
    <Link className="btSignIn" to={{ pathname: "/login", search: "?form=signIn" }}>Already have a account?</Link>
    </form>
    </>
  );
}

function LoginPage()
{
  const [searchParams, setSearchParams] = useSearchParams();
  let isLoginPage = searchParams.get("form") === "signIn";
  return(
    <>
      <Header/>
        <main>
          <Banner/>
          <section className="loginContent">
            {
              isLoginPage?LogInForm():SignUpForm()
            }
          </section>
        </main>
      <Footer/> 
    </>
  );
}

export default LoginPage;