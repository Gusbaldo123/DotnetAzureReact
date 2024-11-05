import React from "react";

import "./LoginPage.css";

import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";



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