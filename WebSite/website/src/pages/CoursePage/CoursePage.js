//#region imports
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./CoursePage.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

import UserManager from "../../utils/UserManager.js";
import CourseManager from "../../utils/CourseManager.js";
import VideoManager from "../../utils/VideoManager.js";

export default CoursePage;
//#endregion

//#region Handlers
function CheckBoxChange(event, user, List, targetCourse, i, setUser) {
  if (!user) return;
  const newList = [...List];
  newList[i] = event.target.checked;
  SetCourse(newList, user, targetCourse, setUser);
}

function SetCourse(List, user, targetCourse, setUser) {
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
  UserManager.setLocalUser(updatedUser);
}

function DeleteVideo({ courseId, id }) {
  if (window.confirm("Delete this video?")) {
    VideoManager.deleteVideo(courseId, id);
  }
}
//#region TODO
function AddVideo({ courseId }) {
  //TODO
  VideoManager.addVideo({
    courseVideoUrl: "TODO",
    fkCourseId: courseId
  })
}
//#endregion
//#endregion

//#region JSX
function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseID");
  
  const [user, setUser] = useState(() => UserManager.getLocalUser());
  const [targetCourse, setTargetCourse] = useState(null);
  const [List, setList] = useState([]);

  var Manager = CourseManager; // avoid useEffect missreference

  useEffect(() => {
    const loadCourse = async () => {
      const course = await Manager.getCourse(courseId);
      setTargetCourse(course);

      let defaultVideoList = [];
      course.videoList.forEach(() => defaultVideoList.push(false));

      const userCourseInfo = user?.courseList?.find(course => course.id == courseId);
      setList(userCourseInfo ? userCourseInfo.videoList : defaultVideoList);

      if (user && !user.courseList.find(course => course.id == courseId)) {
        const newUser = { ...user };
        newUser.CourseList.push({
          id: courseId,
          videoList: defaultVideoList,
        });
        setUser(newUser);
      }
    };

    loadCourse();
  }, [courseId, user]);

  useEffect(() => {
    console.log(targetCourse);
    if (targetCourse) {
      document.title = targetCourse.title;
    }
  }, [targetCourse]);

  if (!targetCourse) {
    return <div>Loading...</div>;
  }

  const isStudent = user && user.isStudent;

  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="courseContent">
          <article>
            <div>
              <img src={`data:image/jpeg;base64,${targetCourse.imageBase64}`} alt="courseImage" />
            </div>
            <div>
              <h2>{targetCourse.title}</h2>
              <p>Author: <a href="https://www.linkedin.com/in/gustavorbpereira/">Gustavo Pereira</a></p>
              <p>{targetCourse.description}</p>
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
                      window.open(video);
                      const checkboxEvent = { target: { checked: true } };
                      CheckBoxChange(checkboxEvent, user, List, targetCourse, i, setUser);
                    }}
                  >
                    <p className={`lblVideo txtVid${i}`} id={`txtVid${i}`}>
                      <b>{`Video ${i + 1}`}</b>
                    </p>
                  </div>
                  {user && !isStudent ? <button className="btDelete" onClick={() => { DeleteVideo(courseId, i) }}>Del</button> : null}
                </div>
              ))
            }
            {
              user && !isStudent ?
                (
                  <div key={targetCourse.videoList.length.toString()} className={`videoGroup group${targetCourse.videoList.length}`} id={`group${targetCourse.videoList.length}`}>
                    <div
                      className={`courseVideo newVideo vid${targetCourse.videoList.length}`}
                      id={`vid${targetCourse.videoList.length}`}
                      onClick={() => { AddVideo(courseId) }}
                    >
                      <p className={`lblVideo txtVid${targetCourse.videoList.length}`} id={`txtVid${targetCourse.videoList.length}`}>
                        <b>Add new video</b>
                      </p>
                    </div>
                  </div>
                ) : null
            }
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
//#endregion
