using WebApiDotNet.Classes;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDotNet
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return new List<User>
            {
                new User
                {
                    Id = 0,
                    Email = "admin@skillhub.com",
                    Password = "123",
                    IsStudent = false,
                    FirstName = "Admin",
                    Surname = "SkillHub",
                    Phone = "+000 000 000 000",
                    CourseList = new List<UserCourse>()
                },
                new User
                {
                    Id = 1,
                    Email = "Test@skillhub.com",
                    Password = "123",
                    IsStudent = true,
                    FirstName = "Test",
                    Surname = "SkillHub",
                    Phone = "+000 000 000 000",
                    CourseList = new List<UserCourse>()
                }
            };
        }
    }
}
