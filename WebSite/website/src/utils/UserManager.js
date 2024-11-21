//#region imports
import ApiManager from "./ApiManager.js";
//#endregion

class UserManager {
    //#region Handlers
    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        try {
            this.localUser= JSON.parse(localStorage.getItem("localUser")) || null;
        } catch {
            this.localUser= null;
        }
        UserManager.instance = this;
    }
    loginUser(credentials) {
        if(!credentials)return null;
        return ApiManager.loginUser(credentials);
    }
    createUser(data) {
        return ApiManager.createUser(data);
    }
    getLocalUser() {
        try {
            this.localUser= JSON.parse(localStorage.getItem("localUser")) || null;
        } catch {
            this.localUser= null;
        }
        return this.localUser;
    }
    setLocalUser(newUser) {
        this.localUser = newUser;
        localStorage.setItem("localUser", JSON.stringify(this.localUser));
    }
    //#endregion
}

//#region exports

const userManager = new UserManager();
export default userManager;
//#endregion