//#region imports
import ApiManager from "./ApiManager.js";
//#endregion

class BaseManager {
    constructor(baseURL) {
        if (!baseURL) throw new Error("Base URL must be provided");
        this.baseURL = `${ApiManager.BASE_URL}${baseURL}`;
    }
    async getDataFromJSON(response) {
        if(!response) return null;
        if (!response.ok) return null;
        const resJSON = await response.json();
        
        if (!resJSON.success) return null;
        return resJSON;
    }
    fetchData = async (dataParam) =>
        await this.getDataFromJSON(await ApiManager.fetchAPI(this.baseURL, dataParam));
}

//#region exports
export default BaseManager;
//#endregion
