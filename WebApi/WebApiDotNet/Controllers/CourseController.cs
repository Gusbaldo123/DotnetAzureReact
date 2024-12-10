using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : CRUDController<Course, CourseService>
    {
        public CourseController(ApplicationContext _dbContext) : base(_dbContext){}
    }
}