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
    }
}