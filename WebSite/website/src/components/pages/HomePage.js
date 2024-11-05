import React from "react";

import "./HomePage.css";

import Header from "../Header";
import Banner from "../Banner";
import Footer from "../Footer";

const infoPlaceHolder = [
  {
    "Title":"Become a Professional Swimmer",
    "Img":require("../../assets/ProSwimmer.png")
  },
  {
    "Title":"How to reach the moon",
    "Img":require("../../assets/ReachMoon.png")
  }
];

function HomePage()
{
  return(
    <>
      <Header/>
        <main>
          <Banner/>
          <section className="content">
            <div className="contentCourseSearch">
              <input type="text" id="contentCourseText" className="contentCourseText" placeholder="What do you want to learn?"/>
              <button>Search</button>
            </div>
            <div className="contentCourseCaroussel">
              <button className="contentCoursePrevious btCourses"><img src="" alt="Previous" /></button>
              {
                infoPlaceHolder.map((course, i)=>(
                  <div key={i} className={`course${i} course`}>
                    <img src={course.Img} alt={`course${i}`} />
                    <div className="courseName">{course.Title}</div>
                  </div>
                ))
              }
              <button className="contentCourseNext btCourses"><img src="" alt="Next" /></button>
            </div>
          </section>
        </main>
      <Footer/> 
    </>
  );
}

export default HomePage;