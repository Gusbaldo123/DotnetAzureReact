using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : CRUDController<User, UserService>
    {
        protected IConfiguration _configuration;
        public UserController(ApplicationContext _dbContext, IConfiguration configuration) : base(_dbContext) { _configuration = configuration; }
        protected override UserService CreateInstance(User? _tEntity) => new UserService(_tEntity, dbContext, _configuration);
    }
}