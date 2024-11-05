import React from "react";

import "./CoursePage.css";

import Header from "../Header";
import Banner from "../Banner";
import Footer from "../Footer";

function CoursePage()
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

export default CoursePage;