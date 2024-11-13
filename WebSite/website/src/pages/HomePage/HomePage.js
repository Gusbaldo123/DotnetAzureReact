import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";


const infoPlaceHolder = require("../../TemporaryInfo.js").CourseInfo();


function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 2;
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % infoPlaceHolder.length
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + infoPlaceHolder.length) % infoPlaceHolder.length
    );
  };
  const courseClick = (id) => {
    navigate(`/course?courseID=${id}`);
  };  

  const visibleItems = [
    infoPlaceHolder[currentIndex],
    infoPlaceHolder[(currentIndex + 1) % infoPlaceHolder.length],
    infoPlaceHolder[(currentIndex + 2) % infoPlaceHolder.length],
  ];

  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="content">
          <div className="contentCourseSearch">
            <input
              type="text"
              id="contentCourseText"
              className="contentCourseText"
              placeholder="What do you want to learn?"
            />
            <button>Search</button>
          </div>
          <div className="contentCourseCaroussel">
            <button onClick={handlePrevious} className="contentCoursePrevious btCourses">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M8 4l8 8-8 8" />
              </svg>
            </button>
            <div className="carouselWrapper">
            {visibleItems.map((course, i) => (
              <div key={i} className="course fade"  onClick={() => courseClick(course.id)}>
                <img src={course.Img} alt={`course${i}`}/>
                <div className="courseName">{course.Title}</div>
              </div>
            ))}
          </div>
            <button onClick={handleNext} className="contentCourseNext btCourses">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M8 4l8 8-8 8" />
              </svg>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
