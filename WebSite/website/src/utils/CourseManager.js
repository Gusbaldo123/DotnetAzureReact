//#region imports
import ApiManager from "./ApiManager.js";
//#endregion

class CourseManager {
    //#region Handlers
    constructor() {
        if (CourseManager.instance)
            return CourseManager.instance;

        this.listeners = new Set();

        CourseManager.instance = this;
    }
    getAllCourses() {
        return ApiManager.getAllCourses();
    }
    getUserCourses(user) {
        return ApiManager.getUserCourses(user);
    }
    getCourse(id) {
        return ApiManager.getCourse(id);
    }
    addCourse(course)
    {
        return ApiManager.addCourse(course);
    }
    //#endregion
}

//#region exports

const courseManager = new CourseManager();
export default courseManager;
//#endregion