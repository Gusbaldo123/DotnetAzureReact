//#region imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AccountPage.css";

import Header from "../../components/layout/Header.js";
import Footer from "../../components/layout/Footer.js";
import Banner from "../../components/shared/Banner.js";

import UserManager from "../../utils/UserManager.js";
import CourseManager from "../../utils/CourseManager.js";
import AuthManager from "../../utils/AuthManager.js"

export default AccountPage;
//#endregion

//#region Handlers
async function UpdateAccount(e, userVal, navigate) {
    e.preventDefault();

    var courseList = [...userVal.courseList];

    userVal.courseList = [];
    courseList.forEach(element => {
        if (!(userVal.courseList.find((course) => {
            course.id = Number(course.id);
            return Number(course.id) == Number(element.id);
        }))) {
            userVal.courseList.push(element);
        }
    });

    await UserManager.update({
        id: userVal.id,
        email: userVal.email,
        password: userVal.password,
        isStudent: userVal.isStudent,
        firstName: userVal.firstName,
        surname: userVal.surname,
        phone: userVal.phone,
        courseList: userVal.courseList
    });
    
    await AuthManager.authenticate({ email: userVal.email, password: userVal.password });

    if (UserManager.getLocalUser()) {
        navigate("/Home");
    }
}
function AddCourse(navigate) {
    CourseManager.add({
        "title": "New Course",
        "imageBase64": "placeholder_base64_data",
        "description": "Insert Description Here",
        "videoList": []
    });
    navigate("/home");
}
function HandleUpdaveVal(e, userVal, property, updateUserVal) {
    const newUser = { ...userVal };
    newUser[property] = e.target.value;
    updateUserVal(newUser);    
}
//#endregion

//#region JSX
function CourseImage({ targetCourse, user, navigate }) {
    const userTargetCourse = user.courseList.find((courseArg) => courseArg.id == targetCourse.id);
    let counterDone = 0;

    try { // Resolver, TODO

        if (user.isStudent)
            userTargetCourse.videoList.forEach((vid) => { if (vid) counterDone++; });
    } catch (error) {

    }

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

    return <div className="courseOption" id={`course${id}`} onClick={() => { AddCourse(navigate) }}>
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
                    courseList.length <= 0 && user.isStudent ?
                        (<p>You haven't started a course yet</p>) : (courseList.map((course) => <CourseImage targetCourse={course} key={course.id} user={user} navigate={navigate} />))
                }
                <NewCourseImage user={user} id={user.courseList.length} navigate={navigate} />
            </div>
        </div>
    )
}
function DivForm({ chosenField, userVal, updateUserVal }) {
    return (
        <div className={`div${chosenField.field}`} key={`div${chosenField.field}`}>
            <label htmlFor={`lbl${chosenField.field}`}>{chosenField.display}</label>
            <input type={chosenField.type} name={`lbl${chosenField.field}`} id={`lbl${chosenField.field}`} className={`lbl${chosenField.field}`} defaultValue={userVal[chosenField.property]} required onChange={(e) => { HandleUpdaveVal(e, userVal, chosenField.property, updateUserVal); }} disabled={chosenField.disabled} readOnly={chosenField.disabled} autoComplete="new-password" />
        </div>
    );
}
function AccountPage() {
    const navigate = useNavigate();
    let [courseList, setCourseList] = useState(null);
    const user = UserManager.getLocalUser();
    const [userVal, updateUserVal] = useState({ ...user,password:"" });
    const fields = {
        Email: { field: "Email", display: "Email", property: "email", type: "text", disabled: true },
        Password: { field: "Pass", display: "Password", property: "password", type: "password", disabled: false },
        FirstName: { field: "Name", display: "First Name", property: "firstName", type: "text", disabled: false },
        Surname: { field: "Surname", display: "Surname", property: "surname", type: "text", disabled: false },
        Phone: { field: "Phone", display: "Phone", property: "phone", type: "text", disabled: false }
    };

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
                if (idList.length > 0) {
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
                <form action="post" className="formAccount" onSubmit={(e) => { UpdateAccount(e, userVal, navigate) }}>
                    <h2>{user.isStudent ? `${user.firstName}'s Account` : `Mr./Ms ${user.surname}'s Account`}</h2>
                    <h3>Confirm your login</h3>
                    <DivForm chosenField={fields.Email} userVal={userVal} updateUserVal={updateUserVal} />
                    <DivForm chosenField={fields.Password} userVal={userVal} updateUserVal={updateUserVal} />
                    <hr />
                    <h3>Informations</h3>
                    <DivForm chosenField={fields.FirstName} userVal={userVal} updateUserVal={updateUserVal} />
                    <DivForm chosenField={fields.Surname} userVal={userVal} updateUserVal={updateUserVal} />
                    <DivForm chosenField={fields.Phone} userVal={userVal} updateUserVal={updateUserVal} />
                    <div className="btOptions">
                        <button type="submit" className="btUpdate" >Update Account</button>
                        <button className="btDelete">Delete Account</button>
                    </div>
                </form>
                <br />
                <CourseList user={user} navigate={navigate} courseList={courseList} />
            </section>
            <Footer />
        </>
    );
}
//#endregion