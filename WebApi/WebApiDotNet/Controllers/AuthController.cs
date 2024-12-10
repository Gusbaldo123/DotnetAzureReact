using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Models;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Controllers{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : BaseController<Auth>
    {
        public AuthController(ApplicationContext _dbContext) : base(_dbContext){}

        protected override async Task<IActionResult> PostActions(Auth _tEntity)
        {
            try
            {
                var service = new AuthenticationService(_tEntity,dbContext);
                return GetDataResponse(await service.Authenticate());
            }
            catch (Exception ex) { return GetErrorResponse(ex.Message); }
        }
        [HttpPost]
        public async Task<IActionResult> GetResponse([FromBody] Auth _tEntity)
        {
            if (_tEntity == null)
                return GetErrorResponse("Invalid type or data.");

            return await PostActions(_tEntity);
        }
    }
}