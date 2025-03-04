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
function CarrousselCourses({ CourseList, navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = [
    CourseList[currentIndex],
    CourseList[(currentIndex + 1) % CourseList.length],
    CourseList[(currentIndex + 2) % CourseList.length],
  ];
  function Wrapper({ visibleItems, navigate }) {

    if (visibleItems.includes(undefined))
      return (
        <div className="carouselWrapper">
          <h2 className="emptyCourses">There are no courses yet</h2>
        </div>
      );

    return (
      <div className="carouselWrapper">
        {
          visibleItems.map((course, i) => {
            if (course)
              return (
                <div key={i} className="course fade" onClick={() => navigate(`/Course?courseID=${course.id}`)}>
                  <img src={`data:image/png;base64,${course.imageBase64}`} alt={`course${i}`} />
                  <div className="courseName">{course.title}</div>
                </div>
              )
          })
        }
      </div>
    );
  }

  return (
    <div className="contentCourseCaroussel">
      <button onClick={() => PreviousCourse(setCurrentIndex, CourseList)} className="contentCoursePrevious btCourses">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8 4l8 8-8 8" /></svg>
      </button>
      <Wrapper visibleItems={visibleItems} navigate={navigate} />
      <button onClick={() => NextCourse(setCurrentIndex, CourseList)} className="contentCourseNext btCourses">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8 4l8 8-8 8" /></svg>
      </button>
    </div>
  );
}

function HomePage() {

  const [CourseList, setCourseList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Skillhub";

    const loadCourses = async () => {
      const res = await CourseManager.getAll();
      if (!res) return;
      setCourseList(res.data);
    };

    loadCourses();
  }, []);

  if (!CourseList)
    return <div className="homepage-loading">Loading...</div>;

  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="content">
          <div className="contentCourseSearch">
            <input type="text" id="contentCourseText" className="contentCourseText" placeholder="What do you want to learn?" />
            <button>Search</button>
          </div>
          <CarrousselCourses CourseList={CourseList} navigate={navigate} />
        </section>
      </main>
      <Footer />
    </>
  );
}
//#endregion
