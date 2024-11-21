import TemporaryInfo from "./TemporaryInfo"; // TEMPORARY, redo when backend is ready

class ApiManager {
  //#region Handlers
  constructor() {
    this.BASE_URL = 'localhost:3001';
  }

  //#region Courses
  getAllCourses = async () => {
    return TemporaryInfo.CourseInfo(); // Remove when backend is ready


    const response = await fetch(`${this.BASE_URL}/selectCourses`);
    if (!response.ok) return null;

    return response.json();
  };
  getCourse = async (id)=>{
    return TemporaryInfo.CourseInfo().find((course)=>course.id==id); // Remove when backend is ready


    const response = await fetch(`${this.BASE_URL}/getCourse?id=${id}`);
    if (!response.ok) return null;

    return response.json();
  }
  getUserCourses = async (user)=>{
    const allCourses = TemporaryInfo.CourseInfo();
    const userCoursesId = user.CourseList;
    let userCourses = [];

    if(!userCoursesId) return [];
    userCoursesId.forEach(userCourse => {
      allCourses.forEach(course => {
        if(userCourse.id == course.id) userCourses.push(course);
      });
    });
    return userCourses;
  }
  //#endregion

  //#region Users
  loginUser = async (credentials) => {
    if(!credentials) return;
    return TemporaryInfo.UserInfo().find((user)=>user.Email.toLowerCase() == credentials.Email.toLowerCase() && user.Password == credentials.Password);



    const response = await fetch(`${this.BASE_URL}/loginUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return null;

    return response.json();
  };
  
  createUser = async function(data) {
    return;
    
    const response = await fetch(`${this.BASE_URL}/createUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) return null;

    return response.json();
  }
  //#endregion
  //#endregion
}

//#region imports
const apiManager = new ApiManager();
export default apiManager;
//#endregion