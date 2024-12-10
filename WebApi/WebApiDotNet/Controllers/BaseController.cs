using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Models
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<TEntity> : ControllerBase
    {
        protected readonly ApplicationContext dbContext;
        public BaseController(ApplicationContext _dbContext)
        {
            dbContext = _dbContext;
        }
        protected IActionResult GetErrorResponse(string _data) =>
            BadRequest(new RestResponse { Success = false, Data = _data });
        protected IActionResult GetDataResponse(object _data) =>
            Ok(new RestResponse { Success = true, Data = _data });
        protected virtual async Task<IActionResult> PostActions(TEntity _tEntity)
        {
            try
            {
                await Task.Yield();
                return GetErrorResponse("Error: Unimplemented Exception");
            }
            catch (Exception ex) { return GetErrorResponse(ex.Message); }
        }
    }
}