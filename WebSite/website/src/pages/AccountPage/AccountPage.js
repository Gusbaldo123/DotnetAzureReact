//#region imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AccountPage.css";

import Header from "../../components/layout/Header.js";
import Footer from "../../components/layout/Footer.js";
import Banner from "../../components/shared/Banner.js";

import UserManager from "../../utils/UserManager.js";
import CourseManager from "../../utils/CourseManager.js";
import courseManager from "../../utils/CourseManager.js";

export default AccountPage;
//#endregion

//#region Handlers
function UpdateAccount(e, navigate) {
    e.preventDefault();

    navigate("/home");
}
function AddCourse(navigate) {
    courseManager.add({
        "title": "New Course",
        "imageBase64": "placeholder_base64_data",
        "description": "Insert Description Here",
        "videoList": []
    });
    navigate("/home");
}
//#endregion

//#region JSX
function CourseImage({ targetCourse, user, navigate }) {
    const userTargetCourse = user.courseList.find((courseArg) => courseArg.id == targetCourse.id);
    let counterDone = 0;

    if (user.isStudent) userTargetCourse.videoList.forEach((vid) => { if (vid) counterDone++; });

    return targetCourse ? (
        <div className="courseOption" id={`course${targetCourse.id}`} onClick={() => { navigate(`/course?courseID=${targetCourse.id}`) }}>
            <img src={`data:image/png;base64,${targetCourse.imageBase64}`} alt="Course Image" />
            <progress id="file" value={user.isStudent ? counterDone : targetCourse.videoList.length} max={targetCourse.videoList.length} />
            <h4>{targetCourse.title}</h4>
        </div>
    ) : null;
}
function NewCourseImage({ user, id, navigate }) {
    if (user.isStudent) return;

    return <div className="courseOption" id={`course${id}`} onClick={()=>{AddCourse(navigate)}}>
        <img src={require("../../assets/NewCourse.png")} alt="New Course" />
        <h4>Create Course</h4>
    </div>
}
function CourseList({ user, navigate, courseList }) {
    if (!courseList) return;
    return (
        <div className="videoListContainer">
            <h2>{user.isStudent ? "Your Progress" : "Posted Courses"}</h2>
            <br />
            <div className="listVideos">
                {
                    courseList.length <= 0 && user.isStudent?
                        (<p>You haven't started a course yet</p>) : (courseList.map((course) => <CourseImage targetCourse={course} key={course.id} user={user} navigate={navigate} />))
                }
                <NewCourseImage user={user} id={user.courseList.length} navigate={navigate}/>
            </div>
        </div>
    )
}
function AccountPage() {
    const navigate = useNavigate();
    let [courseList, setCourseList] = useState(null);
    const user = UserManager.getLocalUser();

    useEffect(() => {
        document.title = 'My Account';

        if (!user) {
            navigate("/login?form=signIn");
            return;
        }

        const loadCourses = async () => {
            
            if (!user.isStudent) {
                var getAll = await CourseManager.getAll();
                
                if (!getAll) return;
                setCourseList(getAll.data);
            }
            else {
                const idList = [];
                user.courseList.forEach(course => idList.push(course.id));
                var res;
                if (idList.length > 0)
                {
                    const list = await CourseManager.getByList(idList);
                    res = list.data;
                }
                else res = idList;
                
                setCourseList(res);
            }

        };

        loadCourses();
    }, [navigate]);

    if (!user || !courseList) return;

    return (
        <>
            <Header />
            <Banner />
            <section className="accountContent">
                <form action="post" className="formAccount" onSubmit={(e) => { UpdateAccount(e, navigate) }} onChange={() => { }}>
                    <h2>{user.isStudent ? `${user.firstName}'s Account` : `Mr./Ms ${user.surname}'s Account`}</h2>
                    <div>
                        <label htmlFor="lblEmail">Email</label>
                        <input type="text" name="lblEmail" id="lblEmail" className="lblEmail" readOnly disabled value={user.email} required onChange={() => { }} />
                    </div>
                    <div>
                        <label htmlFor="lblPass">Password</label>
                        <input type="password" name="lblPass" id="lblPass" className="lblPass" value={user.password} required onChange={() => { }} />
                    </div>
                    <hr />
                    <h3>Informations</h3>
                    <div>
                        <label htmlFor="lblName">First Name</label>
                        <input type="text" name="lblName" id="lblName" className="lblName" value={user.firstName} required onChange={() => { }} />
                    </div>
                    <div>
                        <label htmlFor="lblSurname">Surname</label>
                        <input type="text" name="lblSurname" id="lblSurname" className="lblSurname" value={user.surname} required onChange={() => { }} />
                    </div>
                    <div>
                        <label htmlFor="lblPhone">Phone</label>
                        <input type="text" name="lblPhone" id="lblPhone" className="lblPhone" value={user.phone} required onChange={() => { }} />
                    </div>
                    <div className="btOptions">
                        <button type="submit" className="btUpdate" >Update Account</button>
                        <button className="btDelete">Delete Account</button>
                    </div>
                </form>
                <br />
                <CourseList user={user} navigate={navigate} courseList={courseList}/>
            </section>
            <Footer />
        </>
    );
}
//#endregion