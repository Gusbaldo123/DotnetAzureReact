import React from "react";

import "./ProfessorPage.css";

import Header from "../../components/layout/Header";
import Banner from "../../components/shared/Banner";
import Footer from "../../components/layout/Footer";

function ProfessorPage()
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

export default ProfessorPage;