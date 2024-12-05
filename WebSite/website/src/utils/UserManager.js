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
    async loginUser(credentials) {
        if(!credentials)return null;
        const response = await ApiManager.loginUser(credentials);
        if(response.success)
            this.setLocalUser(response.data);
        return response;
    }
    createUser(data) {
        const result = ApiManager.createUser(data);
        if(result.success)
            this.loginUser(data);
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