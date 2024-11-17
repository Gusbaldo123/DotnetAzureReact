import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./AccountPage.css";

import Header from "../../components/layout/Header.js";
import Footer from "../../components/layout/Footer.js";
import Banner from "../../components/shared/Banner.js";

const infoPlaceHolder = require("../../TemporaryInfo.js").CourseInfo();

function SubmitUpdateProfile(e, navigate) {
    e.preventDefault();

    navigate("/home");
}

function CourseImage({ id, user, navigate }) {
    const targetCourse = infoPlaceHolder.find((courseArg) => courseArg.id === id);
    const userTargetCourse = user.CourseList.find((courseArg) => courseArg.id === id);
    let counterDone = 0;

    if (user.isStudent) userTargetCourse.videoList.forEach((vid) => { if (vid) counterDone++; });

    return targetCourse ? (
        <div className="courseOption" id={`course${targetCourse.id}`} onClick={() => { navigate(`/course?courseID=${id}`) }}>
            <img src={targetCourse.Img} alt="Course Image" />
            <progress id="file" value={user.isStudent ? counterDone : targetCourse.videoList.length} max={targetCourse.videoList.length} />
            <h4>{targetCourse.Title}</h4>
        </div>
    ) : null;
}
function AddCourse()
{
    //Todo Backend
    console.log("Todo");
}
function NewCourseImage({user}) {
    if(user.isStudent) return;

    let id = infoPlaceHolder.length;

    return <div className="courseOption" id={`course${id}`} onClick={AddCourse}>
        <img src={require("../../assets/NewCourse.png")} alt="New Course" />
        <h4>Create Course</h4>
    </div>
}
function CourseList({ user, navigate }) {
    return (
        <div className="videoListContainer">
            <h2>{user.isStudent ? "Your Progress" : "Posted Courses"}</h2>
            <br />
            <div className="listVideos">
                {
                    user.isStudent ?
                        user.CourseList.length <= 0 ?
                            (<p>You haven't started a course yet</p>) : (user.CourseList.map((course) => <CourseImage key={course.id} id={course.id} user={user} navigate={navigate} />)) :
                        (
                            infoPlaceHolder.map((course) => <CourseImage key={course.id} id={course.id} user={user} navigate={navigate} />)
                        )
                }
                <NewCourseImage user={user}/>
            </div>
        </div>
    )
}

function AccountPage() {
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
        if (!user) navigate("/Home");
    }, [user, navigate]);
    return (
        <>
            <Header />
            <Banner />
            <section className="accountContent">
                <form action="post" className="formAccount" onSubmit={(e) => { SubmitUpdateProfile(e, navigate) }} onChange={() => { }}>
                    <h2>{user.isStudent ? `${user.Firstname}'s Account` : `Mr./Ms ${user.Surname}'s Account`}</h2>
                    <div>
                        <label htmlFor="lblEmail">Email</label>
                        <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" readOnly disabled value={user.Email} required onChange={() => { }} />
                    </div>
                    <div>
                        <label htmlFor="lblPass">Password</label>
                        <input type="password" name="lblPass" id="lblPass" className="lblPass" value={user.Password} required onChange={() => { }} />
                    </div>
                    <hr />
                    <h3>Informations</h3>
                    <div>
                        <label htmlFor="lblName">First Name</label>
                        <input type="text" name="lblName" id="lblName" className="lblName" value={user.Firstname} required onChange={() => { }} />
                    </div>
                    <div>
                        <label htmlFor="lblSurname">Surname</label>
                        <input type="text" name="lblSurname" id="lblSurname" className="lblSurname" value={user.Surname} required onChange={() => { }} />
                    </div>
                    <div>
                        <label htmlFor="lblPhone">Phone</label>
                        <input type="text" name="lblPhone" id="lblPhone" className="lblPhone" value={user.Phone} required onChange={() => { }} />
                    </div>
                    <div className="btOptions">
                        <button type="submit" className="btUpdate" >Update Account</button>
                        <button className="btDelete">Delete Account</button>
                    </div>
                </form>
                <br />
                <CourseList user={user} navigate={navigate} />
            </section>
            <Footer />
        </>
    );
}

export default AccountPage;