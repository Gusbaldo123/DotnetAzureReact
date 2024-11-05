import React from "react";

import "./StudentPage.css";

import Header from "../Header";
import Banner from "../Banner";
import Footer from "../Footer";

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