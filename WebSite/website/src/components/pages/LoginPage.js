import React from "react";

import "./LoginPage.css";

import Header from "../Header";
import Banner from "../Banner";
import Footer from "../Footer";



function LoginPage()
{
  return(
    <>
      <Header/>
        <main>
          <Banner/>
        </main>
      <Footer/> 
    </>
  );
}

export default LoginPage;