//#region imports
import ApiManager from "./ApiManager";
import BaseManager from "./BaseManager";
//#endregion


class CRUDManager extends BaseManager {
    //#region CRUD
    fetchCRUDData = async (action, dataParam) =>
        await this.getDataFromJSON(await ApiManager.fetchAPI(this.baseURL, { Action: action, DataParam: dataParam, }))
    getAll = async () => await this.fetchCRUDData(0, {});
    get = async (id) => await this.fetchCRUDData(1, { id:id });
    add = async (data) => await this.fetchCRUDData(2, data);
    update = async (data) => await this.fetchCRUDData(3, data);
    delete = async (id) => await this.fetchCRUDData(4, { id:id });
    //#endregion
}

//#region exports
export default CRUDManager;
//#endregion