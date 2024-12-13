using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : BaseController<Auth>
    {
        public AuthController(ApplicationContext _dbContext) : base(_dbContext) { }
        [HttpPost]
        public async Task<IActionResult> GetResponse([FromBody] Auth _tEntity)
        {
            if (_tEntity == null)
                return Ok(new RestResponse() { Success = false, Data = "Invalid id list" });

            var service = new AuthenticationService(_tEntity, dbContext);

            return Ok(await service.Authenticate());
        }
    }
}