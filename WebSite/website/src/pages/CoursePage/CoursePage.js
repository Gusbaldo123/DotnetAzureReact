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

  if (updatedUser.courseList) {
    const courseIndex = updatedUser.courseList.findIndex(course => course.id === targetCourse.id);

    if (courseIndex >= 0) {
      updatedUser.courseList[courseIndex].videoList = List;
    } else {
      updatedUser.courseList.push({
        id: targetCourse.id,
        videoList: List,
      });
    }
  }

  setUser(updatedUser);
  UserManager.setLocalUser(updatedUser);
}

function AddVideoComponent() {
  return (
    <div key={`videoNew`} className={`videoGroupNew`} id={`groupNew`}>
      <div className={`courseVideo vid new`} id={`vid new`} >
        <div className="txtVideoName">
          <label htmlFor="">Video Name: </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Video URL: </label>
          <input type="text" />
        </div>
        <div>
          <button>Save</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}
function VideoComponent({ index, user, List, targetCourse, setUser, video, courseId }) {
  const isStudent = user && user.isStudent;
  return (<div key={index.toString()} className={`videoGroup group${index}`} id={`group${index}`}>
    <input
      disabled={user == null}
      className={`videoCheckbox ch${index}`}
      id={`ch${index}`}
      type="checkbox"
      checked={List[index]}
      onChange={(e) => CheckBoxChange(e, user, List, targetCourse, index, setUser)} />
    <div
      className={`courseVideo vid${index}`}
      id={`vid${index}`}
      onClick={() => {
        window.open(video);
        const checkboxEvent = { target: { checked: true } };
        CheckBoxChange(checkboxEvent, user, List, targetCourse, index, setUser);
      }} >
      <p className={`lblVideo txtVid${index}`} id={`txtVid${index}`}>
        <b>{`Video ${index + 1} - ${video.videoTitle}`}</b>
      </p>
    </div>
    {user && !isStudent ? <button className="btDelete" onClick={() => DeleteVideo(courseId, index, user)}>Del</button> : null}
  </div>)
}
function DeleteVideo({ courseId, id }, user) {
  if (user.isStudent) return;
  if (window.confirm("Delete this video?")) {
    VideoManager.delete(courseId, id, user);
  }
}
//#region TODO
function AddVideo({ courseId }, user) {
  if (user.isStudent) return;
  //TODO
  VideoManager.add({
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

  useEffect(() => {
    const loadCourse = async () => {
      const res = await CourseManager.get(courseId);

      if (!res) return;

      setTargetCourse(res.data);

      let defaultVideoList = [];
      res.data.videoList.forEach(() => defaultVideoList.push(false));

      const userCourseInfo = user?.courseList?.find(course => course.id === courseId);
      setList(userCourseInfo ? userCourseInfo.videoList : defaultVideoList);

      if (user && !user.courseList.find(course => course.id === courseId)) {
        const newUser = { ...user };
        newUser.courseList.push({
          id: courseId,
          videoList: defaultVideoList,
        });
        setUser(newUser);
      }
    };

    loadCourse();
  }, [courseId, user]);

  useEffect(() => {
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
              targetCourse.videoList.map((video, index) =>
                <VideoComponent index={index} user={user} List={List} targetCourse={targetCourse} setUser={setUser} video={video} courseId={courseId} />)
            }
            {
              user && !isStudent ?
                (
                  <>
                    <AddVideoComponent />
                    <div key={targetCourse.videoList.length.toString()} className={`videoGroup group${targetCourse.videoList.length}`} id={`group${targetCourse.videoList.length}`}>
                      <div
                        className={`courseVideo newVideo vid${targetCourse.videoList.length}`}
                        id={`vid${targetCourse.videoList.length}`}
                        onClick={() => AddVideo(courseId, user)} >
                        <p className={`lblVideo txtVid${targetCourse.videoList.length}`} id={`txtVid${targetCourse.videoList.length}`}>
                          <b>Add new video</b>
                        </p>
                      </div>
                    </div>
                  </>
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
