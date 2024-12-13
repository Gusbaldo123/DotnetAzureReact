using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : CRUDController<Course, CourseService>
    {
        public CourseController(ApplicationContext _dbContext) : base(_dbContext) { }

        protected virtual async Task<RestResponse> PostIdList(int[] _courseIdList)
        {
            return await new CourseService(null, dbContext)!.SelectCoursesByIdList(_courseIdList);
        }
        [HttpPost("idlist")]
        public async Task<IActionResult> GetCoursesByIdList([FromBody] int[] _courseIdList)
        {
            if (_courseIdList == null || _courseIdList.Length == 0)
                return Ok(new RestResponse(){Success=false, Data = "Invalid id list"});

            return Ok(await PostIdList(_courseIdList));
        }
    }
}
