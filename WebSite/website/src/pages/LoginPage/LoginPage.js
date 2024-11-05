import React from "react";

import "./LoginPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

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