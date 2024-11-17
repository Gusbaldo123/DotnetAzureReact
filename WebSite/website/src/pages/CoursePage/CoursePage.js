import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./CoursePage.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

//Temporary
const CourseInfo = require("../../TemporaryInfo.js").CourseInfo();
//Temporary

function VideoClick(url) {
  window.open(url);
}

function CheckBoxChange(event, user, List, targetCourse, i, setUser) {
  if (!user) return;
  const newList = [...List];
  newList[i] = event.target.checked;
  setCourse(newList, user, targetCourse, setUser);
}

function setCourse(List, user, targetCourse, setUser) {
  const updatedUser = { ...user };
  const courseIndex = updatedUser.CourseList.findIndex(course => course.id == targetCourse.id);

  if (courseIndex >= 0) {
    updatedUser.CourseList[courseIndex].videoList = List;
  } else {
    updatedUser.CourseList.push({
      id: targetCourse.id,
      videoList: List,
    });
  }

  setUser(updatedUser);
  localStorage.setItem("localUser", JSON.stringify(updatedUser));
}

function DeleteVideo({id})
{
  if (window.confirm("Delete this video?")) {
    console.log("TODO");
  }
}
function AddVideo({id})
{
  console.log("TODO");
}

function CoursePage() {
  const [searchParams] = useSearchParams();
  let courseId = searchParams.get("courseID");
  const targetCourse = CourseInfo.find(course => course.id == courseId);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("localUser"));
    } catch {
      return null;
    }
  });

  const chBox = useRef(null);

  let defaultVideoList = [];
  targetCourse.videoList.forEach(() => defaultVideoList.push(false));

  const userCourseInfo = user?.CourseList?.find(course => course.id == targetCourse.id);
  const List = userCourseInfo ? userCourseInfo.videoList : defaultVideoList;

  useEffect(() => {
    if (user && !user.CourseList.find(course => course.id == targetCourse.id)) {
      const newUser = { ...user };
      newUser.CourseList.push({
        id: targetCourse.id,
        videoList: defaultVideoList,
      });
      setUser(newUser);
    }
  }, [user, targetCourse.id]);

  useEffect(() => {
    document.title = targetCourse.Title;
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banner />
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
              targetCourse.videoList.map((video, i) => (
                <div key={i.toString()} className={`videoGroup group${i}`} id={`group${i}`}>
                  <input
                    disabled={user == null}
                    className={`videoCheckbox ch${i}`}
                    id={`ch${i}`}
                    type="checkbox"
                    checked={List[i]}
                    onChange={(e) => {
                      CheckBoxChange(e, user, List, targetCourse, i, setUser);
                    }}
                  />
                  <div
                    className={`courseVideo vid${i}`}
                    id={`vid${i}`}
                    onClick={() => {
                      VideoClick(video, targetCourse, List, i);
                      const checkboxEvent = { target: { checked: true } };
                      CheckBoxChange(checkboxEvent, user, List, targetCourse, i, setUser);
                    }}
                  >
                    <p className={`lblVideo txtVid${i}`} id={`txtVid${i}`}>
                      <b>{`Video ${i + 1}`}</b>
                    </p>
                  </div>
                  {user.isStudent?null:<button className="btDelete" onClick={()=>{DeleteVideo(i)}}>Del</button>}
                </div>
              ))
            }
            {
              user.isStudent?null:
              (
                <div key={targetCourse.videoList.length.toString()} className={`videoGroup group${targetCourse.videoList.length}`} id={`group${targetCourse.videoList.length}`}>
                  <div
                    className={`courseVideo newVideo vid${targetCourse.videoList.length}`}
                    id={`vid${targetCourse.videoList.length}`}
                    onClick={()=>{AddVideo(targetCourse.videoList.length)}}
                  >
                    <p className={`lblVideo txtVid${targetCourse.videoList.length}`} id={`txtVid${targetCourse.videoList.length}`}>
                      <b>Add new video</b>
                    </p>
                  </div>
                </div>
              )
            }

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CoursePage;
