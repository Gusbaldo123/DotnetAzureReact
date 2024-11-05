import React from "react";

import "./StudentPage.css";

import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

function StudentPage()
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

export default StudentPage;