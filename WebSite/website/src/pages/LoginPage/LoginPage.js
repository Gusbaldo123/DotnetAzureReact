//#region imports
import React, { useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

import "./LoginPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

import UserManager from "../../utils/UserManager.js";
import AuthManager from "../../utils/AuthManager.js"
import userManager from "../../utils/UserManager.js";

export default LoginPage;
//#endregion

//#region Handlers
async function SubmitLoginForm(event, navigate) {
  event.preventDefault();

  const credentials = {
    email: event.target.elements.lblEmail.value.toLowerCase(),
    password: event.target.elements.lblPass.value
  }

  await AuthManager.authenticate(credentials);
  if(userManager.getLocalUser())
  {
    navigate("/Home");
  }
}
async function SubmitSignUpForm(event, navigate) {
  event.preventDefault();
  const el = event.target.elements;
  await UserManager.add({
    email: el.lblEmail.value.toLowerCase(),
    password: el.lblPass.value,
    isStudent: true,
    firstName: el.lblName.value,
    surname: el.lblSurname.value,
    phone: el.lblPhone.value
  });
  await AuthManager.authenticate({email: el.lblEmail.value.toLowerCase(), password: el.lblPass.value});
  if(userManager.getLocalUser())
    {
      navigate("/Home");
    }
}
//#endregion

//#region JSX
function LogInForm({ navigate }) {
  return (
    <>
      <form className="formLogin" onSubmit={(e) => SubmitLoginForm(e, navigate)}>
        <h2>Log In</h2>
        <div>
          <label htmlFor="lblEmail">Email</label>
          <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" required />
        </div>
        <div>
          <label htmlFor="lblPass">Password</label>
          <input type="password" name="lblPass" id="lblPass" className="lblPass" required />
        </div>
        <button type="submit">LogIn</button>
        <Link className="btForgot" to={{ pathname: "/Recover" }}>Forgot your password?</Link>
        <Link className="btSignUp" to={{ pathname: "/login", search: "?form=signUp" }}>Don't have an account?</Link>
      </form>\
    </>
  );
}
function SignUpForm({ navigate }) {
  return (
    <>
      <form action="post" className="formSignUp" onSubmit={(e) => { SubmitSignUpForm(e, navigate) }}>
        <h2>SignUp</h2>
        <div>
          <label htmlFor="lblEmail">Email</label>
          <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" placeholder="email@email.com" required />
        </div>
        <div>
          <label htmlFor="lblPass">Password</label>
          <input type="password" name="lblPass" id="lblPass" className="lblPass" required />
        </div>
        <hr />
        <h3>Informations</h3>
        <div>
          <label htmlFor="lblName">First Name</label>
          <input type="text" name="lblName" id="lblName" className="lblName" placeholder="ex.: John" required />
        </div>
        <div>
          <label htmlFor="lblSurname">Surname</label>
          <input type="text" name="lblSurname" id="lblSurname" className="lblSurname" placeholder="ex.: Smith" required />
        </div>
        <div>
          <label htmlFor="lblPhone">Phone</label>
          <input type="text" name="lblPhone" id="lblPhone" className="lblPhone" placeholder="+000 000 000" required />
        </div>
        <button type="submit">Register</button>
        <Link className="btSignIn" to={{ pathname: "/login", search: "?form=signIn" }}>Already have an account?</Link>
      </form>
    </>
  );
}
function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLoginPage = searchParams.get("form") === "signIn";

  const user = UserManager.getLocalUser();
  useEffect(() => {
    document.title = isLoginPage ? "Login" : "Sign In";

    if (user) navigate("/Account");
  }, [navigate]);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="loginContent">
          {isLoginPage ? <LogInForm navigate={navigate} /> : <SignUpForm navigate={navigate} />}
        </section>
      </main>
      <Footer />
    </>
  );
}

//#endregion