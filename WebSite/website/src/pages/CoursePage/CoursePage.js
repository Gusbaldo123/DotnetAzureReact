//#region imports
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./CoursePage.css";
import "./CourseMobilePage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

import UserManager from "../../utils/UserManager.js";
import CourseManager from "../../utils/CourseManager.js";

import CourseVideo from "../../components/shared/CourseVideo.js";
import AddCourseVideo from "../../components/shared/AddCourseVideo.js";

export default CoursePage;
//#endregion

//#region Handlers
const ImageToBase64 = (e, course, updateImg64) => {
  const reader = new FileReader()

  reader.readAsDataURL(e.target.files[0])

  reader.onload = () => {
    try {
      const base64img = reader.result.replace(/^data:image\/\w+;base64,/, "");
      course.imageBase64 = base64img;
      UpdateCourse(course);
      updateImg64(base64img);
    } catch (error) {
      alert("Error when uploading image");
    }
  }
}
function UpdateCourse(course) {
  if (course.title.length <= 0) return;

  CourseManager.update({
    "id": course.id,
    "title": course.title,
    "imageBase64": course.imageBase64,
    "description": course.description,
    "videoList": course.videoList
  });
}
function DeleteCourse(courseId, navigate) {
  if (window.confirm("Delete this course?")) {
    CourseManager.delete(courseId);
    navigate("/home");
  }
}

//#endregion

//#region JSX

function HeaderStudent({ img64, targetCourse }) {
  return (
    <article>
      <div className="img-content">
        <img src={`data:image/jpeg;base64,${img64}`} alt="courseImage" />
      </div>
      <div className="videoInfo">
        <h2>{targetCourse.title}</h2>
        <p>Author: <a href="https://www.linkedin.com/in/gustavorbpereira/">Gustavo Pereira</a></p>
        <p>{targetCourse.description}</p>
      </div>
    </article>
  );
}
function HeaderAdmin({ img64, updateImg64, targetCourse, courseId, navigate }) {
  return (
    <article>
      <div className="img-content">
        <img src={`data:image/jpeg;base64,${img64}`} alt="courseImage" />
        <label htmlFor="file-upload" className="custom-file-upload"> Upload Image </label>
        <input type="file" name="" id="file-upload" onChange={(e) => { ImageToBase64(e, targetCourse, updateImg64) }} />
      </div>
      <div className="videoInfo">
        <input type="text" defaultValue={targetCourse.title} onChange={(e) => {
          if (e.target.value.length > 0)
            targetCourse.title = e.target.value;
          UpdateCourse(targetCourse);
        }} />
        <div className="deleteCourse">
          <button onClick={() => { DeleteCourse(courseId, navigate) }}>Remove Course</button>
        </div>
        <p>Author: <a href="https://www.linkedin.com/in/gustavorbpereira/">Gustavo Pereira</a></p>
        <textarea name="" id="" onChange={(e) => {
          targetCourse.description = e.target.value; UpdateCourse(targetCourse);
        }} defaultValue={targetCourse.description} />

      </div>
    </article>
  );
}

function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseID");
  const [user, setUser] = useState(() => UserManager.getLocalUser());
  const [targetCourse, setTargetCourse] = useState(null);
  const [watchedVidList, setWatchedVidList] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(true);
  const navigate = useNavigate();
  const [img64, updateImg64] = useState("");
  const [videoList, updateVideoList] = useState([]);
  const isStudent = !user || user.isStudent;

  useEffect(() => {
    const loadCourse = async () => {
      const res = await CourseManager.get(courseId);
      if (!res) return;
  
      setTargetCourse(res.data);
  
      let defaultVideoList = {
        fkCourseId: Number(courseId),
        videoList: res.data.videoList.map(() => false),
      };
  
      if (!user) {
        setWatchedVidList(defaultVideoList);
        return;
      } // logged user only
  
      if (!user.isStudent) {
        setWatchedVidList(defaultVideoList);
        return;
      } // student user only
  
      const userCourseIndex = user.courseList.findIndex(course => Number(course.fkCourseId) === Number(courseId));
  
      if (userCourseIndex !== -1) {
        setWatchedVidList(user.courseList[userCourseIndex]);
      } else {
        setWatchedVidList(defaultVideoList);
        
        setUser(prevUser => ({
          ...prevUser,
          courseList: [...prevUser.courseList, defaultVideoList] 
        }));
      }
    };
  
    loadCourse();
  }, [courseId]);
  
  useEffect(() => {
    if (targetCourse) {
      document.title = `Skillhub - ${targetCourse.title}`;
      updateImg64(targetCourse.imageBase64);
      updateVideoList(targetCourse.videoList);
    }
  }, [targetCourse]);

  if (!targetCourse) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="courseContent">
          {isStudent ?
            <HeaderStudent img64={img64} targetCourse={targetCourse} />
            :
            <HeaderAdmin img64={img64} updateImg64={updateImg64} targetCourse={targetCourse} courseId={courseId} navigate={navigate} />}
          <br />
          <div className="courseList">
            {videoList.map((video, index) =>
              <CourseVideo key={index} index={index} user={user} watchedVidList={watchedVidList} setWatchedVidList={setWatchedVidList} targetCourse={targetCourse} setUser={setUser} video={video} videoList={videoList} updateVideoList={updateVideoList} />
            )}
            <AddCourseVideo user={user} courseId={courseId} showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} videoList={videoList} updateVideoList={updateVideoList} setWatchedVidList={setWatchedVidList} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
//#endregion
