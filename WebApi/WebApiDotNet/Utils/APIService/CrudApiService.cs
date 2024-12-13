using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class CrudApiService<T> : ApiService<T>, ICrudApiService
    {
        public CrudApiService(T? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext){}

        public virtual bool isDataFilled(T? _course) => true;
        #region API Actions
        /// <summary>
        /// Select All query
        /// </summary>
        /// <returns>Rest Response with select all</returns>
        public virtual async Task<RestResponse> SelectAll()
        {
            await Task.Yield();
            return None();
        }
        /// <summary>
        /// Select by IdList
        /// </summary>
        /// <param name="_idList">Id Array</param>
        /// <returns></returns>
        public virtual async Task<RestResponse> SelectByIdList(int[] _idList)
        {
            await Task.Yield();
            return None();
        }
        /// <summary>
        /// Select query
        /// </summary>
        /// <returns>Rest Response with select</returns>
        public virtual async Task<RestResponse> Select()
        {
            await Task.Yield();
            return None();
        }
        /// <summary>
        /// Create query
        /// </summary>
        /// <returns>Rest Response with success/fail</returns>
        public virtual async Task<RestResponse> Create()
        {
            await Task.Yield();
            return None();
        }
        /// <summary>
        /// Update query
        /// </summary>
        /// <returns>Rest Response with success/fail</returns>
        public virtual async Task<RestResponse> Update()
        {
            await Task.Yield();
            return None();
        }
        /// <summary>
        /// Delete query
        /// </summary>
        /// <returns>Rest Response with success/fail</returns>
        public virtual async Task<RestResponse> Delete()
        {
            await Task.Yield();
            return None();
        }
        /// <summary>
        /// Not found
        /// </summary>
        /// <returns>Rest Response with not found</returns>
        public virtual RestResponse None()
        {
            return GetErrorReponse("Action not found");
        }
        #endregion
    }
}