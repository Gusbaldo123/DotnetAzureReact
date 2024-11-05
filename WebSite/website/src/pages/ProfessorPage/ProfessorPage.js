import React from "react";

import "./ProfessorPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

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