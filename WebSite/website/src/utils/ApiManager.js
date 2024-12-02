import TemporaryInfo from "./TemporaryInfo"; // TEMPORARY, redo when backend is ready

class ApiManager {
  //#region Handlers
  constructor() {
    this.BASE_URL = 'http://localhost:5243/api/Rest';
  }

  //#region Courses
  getAllCourses = async () => {
    const response = await fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Action: 0,
        Type: "course",
        DataParam: {
          id: 0,
          title: "",
          imageBase64: "",
          description: "",
          videoList: []
        }
      })
    });

    if (!response.ok) return null;

    const data = await response.json();
    if(!data.success) return null;
    return data.data;
  };
  getCourse = async (id) => {
    const response = await fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Action: 1,
        Type: "course",
        DataParam: {
          id: Number(id),
          title: "",
          imageBase64: "",
          description: "",
          videoList: []
        }
      })
    });

    if (!response.ok) return null;

    const data = await response.json();
    if(!data.success) return null;

    return data.data[0];
  }
  getUserCourses = async (user) => {
    const allCourses = TemporaryInfo.CourseInfo();
    const userCoursesId = user.CourseList;
    let userCourses = [];

    if (!userCoursesId) return [];
    userCoursesId.forEach(userCourse => {
      allCourses.forEach(course => {
        if (userCourse.id == course.id) userCourses.push(course);
      });
    });
    return userCourses;
  }
  //#endregion

  //#region Users
  loginUser = async (credentials) => {
    if (!credentials) return;
    return TemporaryInfo.UserInfo().find((user) => user.Email.toLowerCase() == credentials.Email.toLowerCase() && user.Password == credentials.Password);



    const response = await fetch(`${this.BASE_URL}/loginUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return null;

    return response.json();
  };

  createUser = async function (data) {
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