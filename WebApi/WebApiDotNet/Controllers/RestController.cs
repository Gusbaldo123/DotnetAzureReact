using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;
using System.Text.Json;

namespace WebApiDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestController : ControllerBase
    {
        private readonly ApplicationContext dbContext;

        #region Handlers
        public RestController(ApplicationContext _dbContext)
        {
            dbContext = _dbContext;
        }

        /// <summary>
        /// Gets the parameter data from JSON
        /// </summary>
        /// <param name="_action">Rest Action</param>
        /// <returns>JSON data parameter, on a dynamic type</returns>
        private object? GetRestParameter(RestAction _action)
        {
            try
            {
                if (_action.Type != null)
                {
                    Type? type = _action.Type.ToLower() switch
                    {
                        "course" => typeof(Course),
                        "user" => typeof(User),
                        "video" => typeof(CourseVideo),
                        "auth" => typeof(Auth),
                        _ => null
                    };

                    if (type != null)
                        return JsonSerializer.Deserialize(_action.DataParam.GetRawText(), type);
                }
            }
            catch { }
            return null;
        }

        #region TODO
        async Task<RestResponse> CRUDActions(object RestParameter, RestAction action)
        {

            ICrudApiService ApiCall = RestParameter switch
            {
                Course course => new CourseService(course, dbContext),
                CourseVideo video => new VideoService(video, dbContext),
                User user => new UserService(user, dbContext),
                Auth auth => new UserService(new Models.User(), dbContext), //TODO, remove this line
                _ => throw new InvalidOperationException("Unknown type")
            };

            RestResponse response;
            if ((ActionType)action.Action == ActionType.LOGIN) // TODO Endpoints
                response = await new AuthenticationService((Auth)RestParameter, dbContext).Authenticate(); // TODO Endpoints
            else
                response = (ActionType)action.Action switch
                {
                    ActionType.SELECT_ALL => await ApiCall.SelectAll(),
                    ActionType.SELECT => await ApiCall.Select(),
                    ActionType.CREATE => await ApiCall.Create(),
                    ActionType.UPDATE => await ApiCall.Update(),
                    ActionType.DELETE => await ApiCall.Delete(),
                    ActionType.NONE => ApiCall.None(),
                    _ => ApiCall.None()
                }; // TODO Endpoints

            return response;

        }
        #endregion
        #endregion

        #region HTTP Method
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RestAction action)
        {
            var RestParameter = GetRestParameter(action);

            if (RestParameter == null)
                return BadRequest(new RestResponse { Success = false, Data = "Invalid type or data." });

            var response = await CRUDActions(RestParameter, action); // TODO Endpoints

            return Ok(response);
        }
        #endregion
    }
}
