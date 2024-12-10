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
        protected virtual async Task<IActionResult> PostActions(CRUDAction _action, TEntity _tEntity)
        {
            try
            {
                var service = (TService)Activator.CreateInstance(typeof(TService), _tEntity, dbContext)!;

                return GetDataResponse((CRUDActionType)_action.Action switch
                {
                    CRUDActionType.SELECT_ALL => await service.SelectAll(),
                    CRUDActionType.SELECT => await service.Select(),
                    CRUDActionType.CREATE => await service.Create(),
                    CRUDActionType.UPDATE => await service.Update(),
                    CRUDActionType.DELETE => await service.Delete(),
                    _ => service.None()
                });
            }
            catch (Exception ex) { return GetErrorResponse(ex.Message); }
        }
        [HttpPost]
        public async Task<IActionResult> GetResponse([FromBody] CRUDAction _action)
        {
            TEntity? tEntity = GetDataParam(_action);

            if (tEntity == null)
                return GetErrorResponse("Invalid type or data.");

            return await PostActions(_action, tEntity);
        }
    }
}
