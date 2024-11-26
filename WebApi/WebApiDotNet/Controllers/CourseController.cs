using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Classes;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;
using System.Text.Json;

namespace WebApiDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseContext _context;

        public CourseController(CourseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<RestResponse> PostAsync([FromBody] RestAction action)
        {
            Course course;
            try
            {
                if (action.DataParam == null) course = new Course();
                else
                {
                    string dtJSON = action.DataParam.ToString();

                    course = JsonSerializer.Deserialize<Course>(dtJSON);
                }
            }
            catch
            {
                course = new Course();
                throw;
            }
            CourseApiCall ApiCall = new CourseApiCall(course, _context); // Cast object type to Course type
            RestResponse response;
            switch ((ActionType)action.Action)
            {
                case ActionType.SELECT_ALL:
                    response = await ApiCall.SelectAll();
                    break;

                case ActionType.SELECT:
                    response = await ApiCall.Select();
                    break;

                case ActionType.CREATE:
                    response = await ApiCall.Create();
                    break;

                case ActionType.UPDATE:
                    response = await ApiCall.UPDATE();
                    break;

                case ActionType.DELETE:
                    response = await ApiCall.Delete();
                    break;

                case ActionType.NONE:
                    response = await ApiCall.None();
                    break;
                default:
                    response = await ApiCall.None();
                    break;
            }

            return response;
        }
    }
}