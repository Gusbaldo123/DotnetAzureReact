//#region imports
const ApiCallManager = new ApiManager();
export default ApiCallManager;
//#endregion

class ApiManager {
  //#region Handlers
  constructor() {
    this.BASE_URL = 'localhost:3001';
  }

  //#region Courses
  GetAllCourses = async () => {
    const response = await fetch(`${BASE_URL}/selectCourses`);
    if (!response.ok) return null;

    return response.json();
  };
  getCourse = async (id)=>{
    const response = await fetch(`${BASE_URL}/getCourse?id=${id}`);
    if (!response.ok) return null;

    return response.json();
  }
  //#endregion

  //#region Users
  loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/loginUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return null;

    return response.json();
  };
  
  createUser = async function(data) {
    const response = await fetch(`${BASE_URL}/createUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) return null;

    return response.json();
  }
  //#endregion
  //#endregion
}