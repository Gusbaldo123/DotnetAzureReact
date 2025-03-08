//#region imports
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
function DeleteVideo(id, user, index, videoList, updateVideoList) {
  if (user.isStudent) return;
  if (window.confirm("Delete this video?")) {
    VideoManager.delete(id);
    const newVideoList = [...videoList]; // Cria uma cópia do array
    newVideoList.splice(index, 1); // Remove o item
    updateVideoList(newVideoList); // Atualiza o estado com um novo array
  }
}

//#endregion

//#region JSX
function AddVideoComponent({ user, courseId, onAdd, showAddVideo, setShowAddVideo, videoList, updateVideoList }) {
  const emptyVideoValues = {
    id: 0,
    videoTitle: "",
    videoUrl: "",
    fkCourseId: Number(courseId)
  };
  const [videoValues, updateVideoValues] = useState({ ...emptyVideoValues });
  if (!user) return;
  if (user.isStudent) return;

  if (showAddVideo)
    return (
      <div className="courseVideo newVideo" onClick={() => setShowAddVideo(!showAddVideo)}>
        <p><b>Add new video</b></p>
      </div>
    );

  const handleChange = (e) => {
    updateVideoValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleAddClick = (onAdd, videoValues, showAddVideo, emptyVideoValues, videoList, updateVideoList) => {
    onAdd(videoValues, videoList, updateVideoList);
    setShowAddVideo(!showAddVideo);
    updateVideoValues({ ...emptyVideoValues });
  }

  return (
    <div key="videoNew" className="videoGroup new" id="groupNew">
      <div className="courseVideo vid new" id="vid new">
        <div className="videoContent">
          <div className="txtVideoName">
            <label>Video Name: </label>
            <input type="text" name="videoTitle" value={videoValues.videoTitle} onChange={handleChange} />
          </div>
          <div>
            <label>Video URL: </label>
            <input type="text" name="videoUrl" value={videoValues.videoUrl} onChange={handleChange} />
          </div>
          <div>
            <button onClick={() => { handleAddClick(onAdd, videoValues, showAddVideo, emptyVideoValues, videoList, updateVideoList) }}>Add</button>
            <button onClick={() => setShowAddVideo(!showAddVideo)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function VideoComponent({ index, user, List, targetCourse, setUser, video, videoList, updateVideoList }) {
  const isStudent = user && user.isStudent;
  return (
    <div key={index.toString()} className={`videoGroup group${index}`} id={`group${index}`}>
      <input
        disabled={!user}
        className={`videoCheckbox ch${index}`}
        id={`ch${index}`}
        type="checkbox"
        checked={List[index]}
        onChange={(e) => CheckBoxChange(e, user, List, targetCourse, index, setUser)} />
      <div
        className={`courseVideo vid${index}`}
        id={`vid${index}`}
        onClick={() => {
          window.open(video.videoUrl);
          const checkboxEvent = { target: { checked: true } };
          CheckBoxChange(checkboxEvent, user, List, targetCourse, index, setUser);
        }} >
        <p className={`lblVideo txtVid${index}`} id={`txtVid${index}`}>
          <b>{`Video ${index + 1} - ${video.videoTitle}`}</b>
        </p>
      </div>
      {user && !isStudent ? <button className="btDelete" onClick={() => DeleteVideo(video.id, user, index, videoList, updateVideoList)}>Del</button> : null}
    </div>
  )
}
function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseID");

  const [user, setUser] = useState(() => UserManager.getLocalUser());
  const [targetCourse, setTargetCourse] = useState(null);
  const [List, setList] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(true);
  const navigate = useNavigate();
  const [img64, updateImg64] = useState("");
  const [videoList, updateVideoList] = useState([]);

  useEffect(() => {
    const loadCourse = async () => {
      const res = await CourseManager.get(courseId);

      if (!res) return;
      setTargetCourse(res.data);

      let defaultVideoList = res.data.videoList.map(() => false);

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
      updateImg64(targetCourse.imageBase64);
      updateVideoList(targetCourse.videoList);
    }
  }, [targetCourse]);

  const handleAddVideo = (videoData, videoList, updateVideoList) => {
    VideoManager.add(videoData);
    setShowAddVideo(false);
    videoList.push(videoData);
    updateVideoList(videoList);
  };

  if (!targetCourse) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="courseContent">
          <article>
            {
              !user || user.isStudent ?
                (
                  <div className="img-content">
                    <img src={`data:image/jpeg;base64,${img64}`} alt="courseImage" />
                  </div>
                ) :
                (
                  <div className="img-content">
                    <img src={`data:image/jpeg;base64,${img64}`} alt="courseImage" />
                    <label htmlFor="file-upload" className="custom-file-upload"> Upload Image </label>
                    <input type="file" name="" id="file-upload" onChange={(e) => { ImageToBase64(e, targetCourse, updateImg64) }} />
                  </div>
                )
            }
            {
              !user || user.isStudent ?
                (
                  <div >
                    <h2>{targetCourse.title}</h2>
                    <p>Author: <a href="https://www.linkedin.com/in/gustavorbpereira/">Gustavo Pereira</a></p>
                    <p>{targetCourse.description}</p>
                  </div>
                ) :
                (
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
                )
            }
          </article>
          <br />
          <div className="courseList">
            {videoList.map((video, index) =>
              <VideoComponent key={index} index={index} user={user} List={List} targetCourse={targetCourse} setUser={setUser} video={video} videoList={videoList} updateVideoList={updateVideoList} />
            )}
            <AddVideoComponent user={user} courseId={courseId} onAdd={handleAddVideo} showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} videoList={videoList} updateVideoList={updateVideoList} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
//#endregion
