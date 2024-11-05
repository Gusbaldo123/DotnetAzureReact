import React from "react";

import "./CoursePage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

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