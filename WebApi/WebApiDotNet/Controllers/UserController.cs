using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : CRUDController<User, UserService>
    {
        public UserController(ApplicationContext _dbContext) : base(_dbContext) { }
    }
}