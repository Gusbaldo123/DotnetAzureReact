import React from "react";

import "./StudentPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

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