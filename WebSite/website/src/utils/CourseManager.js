//#region imports
import ApiManager from "./ApiManager.js";
import CRUDManager from "./CRUDManager.js";
//#endregion

class CourseManager extends CRUDManager {
    constructor() {
        super("/course");
    }
    getUserCourses = async (data) => 
        await this.getDataFromJSON(await ApiManager.fetchAPI(this.baseURL, data))
}

//#region exports
const courseManager = new CourseManager();
export default courseManager;
//#endregion
