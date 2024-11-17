import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./StudentPage.css";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/shared/Banner";

const infoPlaceHolder = require("../../TemporaryInfo.js").CourseInfo();

function SubmitUpdateProfile(e,navigate)
{
    e.preventDefault();

    navigate("/home");
}

function CourseImage({ id,user,navigate }) {
    const targetCourse = infoPlaceHolder.find((courseArg) => courseArg.id === id);
    const userTargetCourse = user.CourseList.find((courseArg) => courseArg.id === id);
    let counterDone = 0;

    userTargetCourse.videoList.forEach((vid)=>{if(vid)counterDone++;});
    return targetCourse ? (
        <div className="coursesStudent" id={`course${targetCourse.id}`} onClick={()=>{navigate(`/course?courseID=${id}`)}}>
            <img src={targetCourse.Img} alt="Course Image" />
            <progress id="file" value={counterDone} max={targetCourse.videoList.length}/>
            <h4>{targetCourse.Title}</h4>
        </div>
    ) : null;
}


function StudentPage()
{
  const navigate = useNavigate();

  useEffect(() => {
      document.title = 'My Account';
    }, []);

  let user = null;
  try {
      user = JSON.parse(localStorage.getItem("localUser"));
  } catch (error) {
      user = null;
  }
  useEffect(() => {
    if (!user) {
        navigate("/home");
    }
}, [user, navigate]);


  let courses = [];
  user.CourseList.map((course)=>{
    courses.push(course);
  });


  return(
      <>
      <Header/>
      <Banner/>
      <section className="studentContent">
          <form action="post" className="formStudent" onSubmit={(e)=>{SubmitUpdateProfile(e,navigate)}} onChange={()=>{}}>
              <h2>{`${user.Firstname}'s Account`}</h2>
              <div>
              <label htmlFor="lblEmail">Email</label>
              <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" readOnly disabled value={user.Email} required onChange={()=>{}} />
              </div>
              <div>
              <label htmlFor="lblPass">Password</label>
              <input type="password" name="lblPass" id="lblPass" className="lblPass" value={user.Password} required onChange={()=>{}}/>
              </div>
              <hr />
              <h3>Informations</h3>
              <div>
              <label htmlFor="lblName">First Name</label>
              <input type="text" name="lblName" id="lblName" className="lblName" value={user.Firstname} required onChange={()=>{}}/>
              </div>
              <div>
              <label htmlFor="lblSurname">Surname</label>
              <input type="text" name="lblSurname" id="lblSurname" className="lblSurname"value={user.Surname} required onChange={()=>{}}/>
              </div>
              <div>
              <label htmlFor="lblPhone">Phone</label>
              <input type="text" name="lblPhone" id="lblPhone" className="lblPhone" value={user.Phone} required onChange={()=>{}}/>
              </div>
              <div className="btOptions">
                  <button type="submit" className="btUpdate" >Update Account</button>
                  <button className="btDelete">Delete Account</button>
                  </div>
          </form>
          <br />
          <div action="post" className="studentVideos">
            <h2>Your Progress</h2>
            <br />
            <div className="listVideos">
                {courses.length <= 0 ? (
                    <p>You haven't started a course yet</p>
                ) : (
                    courses.map((course) => <CourseImage key={course.id} id={course.id} user={user} navigate={navigate}/>)
                )}
            </div>
        </div>
      </section>
      <Footer/>
      </>
  );
}

export default StudentPage;