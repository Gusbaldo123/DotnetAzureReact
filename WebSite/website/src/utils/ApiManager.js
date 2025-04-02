class ApiManager {
  //#region Handlers
  constructor() {
    this.BASE_URL = 'http://localhost:5243/api';
  }
  async fetchAPI(URL,body) {
    
    try {
      return await fetch(URL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    } catch (error) {
      return;
    }
  }
  //#endregion
}

//#region exports
const apiManager = new ApiManager();
export default apiManager;
//#endregion