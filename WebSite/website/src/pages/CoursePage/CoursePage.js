import React from "react";

import "./CoursePage.css";

import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";

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