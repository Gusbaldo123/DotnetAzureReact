//#region imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

import CourseManager from "../../utils/CourseManager.js";

export default HomePage;

//#endregion

//#region Handlers
const NextCourse = (setCurrentIndex, CourseList) => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % CourseList.length);
};

const PreviousCourse = (setCurrentIndex, CourseList) => {
  setCurrentIndex((prevIndex) => (prevIndex - 1 + CourseList.length) % CourseList.length);
};
//#endregion

//#region JSX
function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [CourseList, setCourseList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Skillhub";

    const loadCourses = async () => {
      const courses = await CourseManager.getAllCourses(); 
      setCourseList(courses);
    };

    loadCourses();
  }, []); 

  if (!CourseList) {
    return <div>Loading...</div>; 
  }

  const visibleItems = [
    CourseList[currentIndex],
    CourseList[(currentIndex + 1) % CourseList.length],
    CourseList[(currentIndex + 2) % CourseList.length],
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
            <button
              onClick={() => PreviousCourse(setCurrentIndex, CourseList)}
              className="contentCoursePrevious btCourses"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M8 4l8 8-8 8" />
              </svg>
            </button>
            <div className="carouselWrapper">
              {visibleItems.map((course, i) => (
                <div
                  key={i}
                  className="course fade"
                  onClick={() => navigate(`/Course?courseID=${course.id}`)}
                >
                  <img src={course.Img} alt={`course${i}`} />
                  <div className="courseName">{course.Title}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => NextCourse(setCurrentIndex, CourseList)}
              className="contentCourseNext btCourses"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
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
//#endregion
