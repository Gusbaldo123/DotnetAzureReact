//#region imports
import CRUDManager from "./CRUDManager.js";
//#endregion

class UserManager extends CRUDManager {
    //#region Handlers
    constructor() {
        super("/user");
        if (UserManager.instance)
            return UserManager.instance;
        UserManager.instance = this;
        this.loadLocalUser();
    }
    loadLocalUser() {
        try {
            this.localUser = JSON.parse(localStorage.getItem("localUser")) || null;
        } catch {
            this.localUser = null;
        }
    }
    getLocalUser() {
        this.loadLocalUser();
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