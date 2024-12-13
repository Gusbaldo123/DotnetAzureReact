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
        private object? GetDataParam(CRUDAction _action)
        {
            try
            {
                if (_action.DataParam == null || !_action.DataParam.HasValue)
                    return null;

                return JsonSerializer.Deserialize<TEntity>(_action.DataParam.Value.GetRawText());
            }
            catch
            {
                return null;
            }
        }
        RestResponse InvalidParameters(string _reason)=> new RestResponse() { Success = false, Data = _reason };
        protected virtual async Task<RestResponse> PostActions(CRUDAction _action, TEntity? _tEntity)
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
        [HttpPost("idlist")] 
        public async Task<IActionResult> GetByIdList([FromBody] int[] _idList)
        {
            if (_idList == null || _idList.Length == 0)
                return Ok(new RestResponse() { Success = false, Data = "Invalid id list" });
            
            var service = (TService)Activator.CreateInstance(typeof(TService), null, dbContext)!;

            return Ok(await service.SelectByIdList(_idList));
        }
        [HttpPost]
        public async Task<IActionResult> GetResponse([FromBody] CRUDAction? _action)
        {
            if (_action == null)
                return Ok(InvalidParameters("Action must not be null"));
            
            object? objParam = GetDataParam(_action);
            if(objParam == null)
                return Ok(InvalidParameters("Data Param must not be null"));
            
            TEntity tEntity = (TEntity)objParam;
            
            bool isActionImpossible = tEntity == null &&
            _action.Action != null &&
            (CRUDActionType)_action.Action != CRUDActionType.SELECT_ALL;

            if (_action.Action == null || isActionImpossible)
                return Ok(InvalidParameters("Data Param and Action incompatible"));

            return Ok(await PostActions(_action, tEntity));
        }
    }
}
