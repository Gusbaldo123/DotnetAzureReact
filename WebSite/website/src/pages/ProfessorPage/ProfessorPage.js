import React,{useEffect} from "react";

import "./ProfessorPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

function ProfessorPage()
{
  useEffect(() => {
    document.title = "TODO";
  }, []);

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