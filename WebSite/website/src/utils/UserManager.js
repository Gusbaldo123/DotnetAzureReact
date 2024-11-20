//#region imports
import ApiManager from "./ApiManager.js";

const userManager = new UserManager();
export default userManager;
//#endregion

class UserManager {
    //#region Handlers
    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }

        this.localUser = () => {
            try {
                return JSON.parse(localStorage.getItem("localUser")) || null;
            } catch {
                return null;
            }
        }
        this.listeners = new Set();

        UserManager.instance = this;
    }
    LoginUser(credentials) {
        return ApiManager.loginUser(credentials);
    }
    CreateUser(data) {
        return ApiManager.createUser(data);
    }
    GetLocalUser() {
        return this.localUser;
    }
    SetLocalUser(newUser) {
        this.localUser = newUser;
        localStorage.setItem("localUser", JSON.stringify(this.localUser));
        this.listeners.forEach((callback) => callback(this.localUser));
    }

    //#region Listeners
    AddListener(callback) {
        this.listeners.add(callback);
    }
    RemoveListener(callback) {
        this.listeners.delete(callback);
    }
    RemoveAllListeners() {
        this.listeners.clear();
    }
    //#endregion
    //#endregion
}
