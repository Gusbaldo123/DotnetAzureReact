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
        private object GetRestParameter(RestAction _action)
        {
            try
            {
                Type type = _action.Type.ToLower() switch
                {
                    "course" => typeof(Course),
                    "user" => typeof(User),
                    "video" => typeof(CourseVideo),
                    _ => null
                };

                if (type != null)
                {
                    return JsonSerializer.Deserialize(_action.DataParam.GetRawText(), type);
                }

                return null;
            }
            catch
            {
                return null;
            }
        }

        #endregion

        #region HTTP Methods
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RestAction action)
        {
            var RestParameter = GetRestParameter(action);

            if (RestParameter == null) return BadRequest(new RestResponse { Success = false, Data = "Invalid type or data." });

            IApiCaller ApiCall = RestParameter switch
            {
                Course course => new CourseApiCall(course, dbContext),
                User user => new ApiCaller<User>(user, dbContext),
                CourseVideo video => new VideoApiCall(video, dbContext),
                _ => throw new InvalidOperationException("Unknown type")
            };

            RestResponse response = (ActionType)action.Action switch
            {
                ActionType.SELECT_ALL => await ApiCall.SelectAll(),
                ActionType.SELECT => await ApiCall.Select(),
                ActionType.CREATE => await ApiCall.Create(),
                ActionType.UPDATE => await ApiCall.Update(),
                ActionType.DELETE => await ApiCall.Delete(),
                ActionType.NONE => ApiCall.None(),
                _ => ApiCall.None()
            };

            return Ok(response);
        }
        #endregion
    }
}
