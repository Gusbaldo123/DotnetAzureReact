//#region imports
import ApiManager from "./ApiManager.js";

export default CourseManager;
//#endregion

class CourseManager{
    constructor(){
        if(CourseManager.instance)
            return CourseManager.instance;
        
        this.listeners = new Set();

        CourseManager.instance = this;
    }
    GetAllCourses(){
        return ApiManager.GetAllCourses();
    }
    GetCourse(id){
        return ApiManager.GetCourse(id);
    }
    
}