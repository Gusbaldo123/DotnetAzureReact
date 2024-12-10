using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("api/video")]
    [ApiController]
    public class VideoController : CRUDController<CourseVideo, VideoService>
    {
        public VideoController(ApplicationContext _dbContext) : base(_dbContext) { }
    }
}