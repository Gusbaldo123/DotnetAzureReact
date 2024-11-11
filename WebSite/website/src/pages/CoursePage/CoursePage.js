import React from "react";
import { useSearchParams } from "react-router-dom";

import "./CoursePage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

const infoPlaceHolder = require("../../TemporaryInfo.js").CourseInfo();

function VideoClick(url)
{
  window.open(url);
}

function CoursePage()
{
  const [searchParams] = useSearchParams();
  let courseId = searchParams.get("courseID");
  const targetCourse = infoPlaceHolder.find(course=>{return course.id==courseId});

  return(
    <>
      <Header/>
        <main>
          <Banner/>
          <section className="courseContent">
            <article>
            <div>
              <img src={targetCourse.Img} alt="courseImage" />
            </div>
            <div>
              <h2>{targetCourse.Title}</h2>
              <p>Author: <a href="https://www.linkedin.com/in/gustavorbpereira/">Gustavo Pereira</a></p>
              <p>{targetCourse.Description}</p>
            </div>
            </article>
            <br />
            <div className="courseList">
            {
              targetCourse.videoList.map((video,i)=>(<div className="courseVideo" onClick={()=>{VideoClick(video)}}><p><b>{`Video ${i+1}`}</b></p></div>))
            }
            </div>
          </section>
        </main>
      <Footer/> 
    </>
  );
}

export default CoursePage;