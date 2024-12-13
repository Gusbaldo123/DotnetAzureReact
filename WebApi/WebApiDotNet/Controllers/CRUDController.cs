using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Utils;

namespace WebApiDotNet.Models
{
    [ApiController]
    [Route("api/[controller]")]
    public class CRUDController<TEntity, TService> : BaseController<TEntity> where TService : CrudApiService<TEntity>
    {
        public CRUDController(ApplicationContext _dbContext) : base(_dbContext) { }

        private TEntity? GetDataParam(CRUDAction _action)
        {
            try
            {
                if (_action.DataParam == null || !_action.DataParam.HasValue)
                    return default;

                return JsonSerializer.Deserialize<TEntity>(_action.DataParam.Value.GetRawText());
            }
            catch
            {
                return default;
            }
        }
        protected virtual async Task<RestResponse> PostActions(CRUDAction _action, TEntity _tEntity)
        {
            var service = (TService)Activator.CreateInstance(typeof(TService), _tEntity, dbContext)!;
            if (_action == null || _action.Action == null)
                return service.None();

            return (CRUDActionType)_action.Action switch
            {
                CRUDActionType.SELECT_ALL => await service.SelectAll(),
                CRUDActionType.SELECT => await service.Select(),
                CRUDActionType.CREATE => await service.Create(),
                CRUDActionType.UPDATE => await service.Update(),
                CRUDActionType.DELETE => await service.Delete(),
                _ => service.None()
            };
        }
        [HttpPost]
        public async Task<IActionResult> GetResponse([FromBody] CRUDAction _action)
        {
            TEntity? tEntity = GetDataParam(_action);

            if (tEntity == null)
                return Ok(new RestResponse(){Success=false, Data = "Invalid id list"});

            return Ok(await PostActions(_action, tEntity));
        }
    }
}
