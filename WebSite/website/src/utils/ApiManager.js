import TemporaryInfo from "./TemporaryInfo"; // TEMPORARY, redo when backend is ready

class ApiManager {
  //#region Handlers
  constructor() {
    this.BASE_URL = 'http://localhost:5243/api/Rest';
  }
  async fetchAPI(body) {
    return await fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
  //#region Courses
  getAllCourses = async () => {
    const response = await this.fetchAPI({
      Action: 0,
      Type: "course",
      DataParam: {
        id: 0,
        title: "",
        imageBase64: "",
        description: "",
        videoList: []
      }
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.success) return null;
    return data.data;
  };
  getCourse = async (id) => {
    const response = await this.fetchAPI({
      Action: 1,
      Type: "course",
      DataParam: {
        id: Number(id),
        title: "",
        imageBase64: "",
        description: "",
        videoList: []
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.success) return null;

    return data.data;
  }
  addCourse = async (course) => {

  }
  //#endregion

  //#region Videos
  addVideo = async (video) => {
    //TODO
  }
  deleteVideo = async (courseId, id) => {
    //TODO
  }
  //#endregion
  //#region Users
  loginUser = async (dataParam) => {
    if (!dataParam) return;
    const response = await this.fetchAPI({
      Action: 6,
      Type: "auth",
      DataParam: dataParam
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.success) return null;
    return data;
  };
  createUser = async function (dataParam) {
    const response = await this.fetchAPI({
      Action: 2,
      Type: "user",
      DataParam: dataParam
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.success) return null;
    return data.data;
  }
  getUserCourses = async (user) => {
    const allCourses = TemporaryInfo.CourseInfo();
    const userCoursesId = user.courseList;
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
  //#endregion
}

//#region imports
const apiManager = new ApiManager();
export default apiManager;
//#endregion