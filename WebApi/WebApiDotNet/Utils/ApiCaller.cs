using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class ApiCaller<T> : IApiCaller
    {
        /// <summary>
        /// Entity Framework Core DbContext
        /// </summary>
        protected ApplicationContext dbContext;
        /// <summary>
        /// JSON data Parameter
        /// </summary>
        protected T? ObjParameter;
        public ApiCaller(T? _ObjParameter, ApplicationContext _dbContext)
        {
            ObjParameter = _ObjParameter;
            dbContext = _dbContext;
        }
        #region REST Responses
        /// <summary>
        /// Error Response method
        /// </summary>
        /// <param name="_message">Error message to concat</param>
        /// <returns>Rest Error with the message</returns>
        protected RestResponse GetErrorReponse(string _message)
        {
            return new RestResponse()
            {
                Success = false,
                Data = "Error: " + _message
            };
        }
        /// <summary>
        /// Data Response method
        /// </summary>
        /// <param name="_data">Data to send JSON response</param>
        /// <returns>Rest with the data</returns>
        protected RestResponse GetDataResponse(object _data)
        {
            return new RestResponse()
            {
                Success = true,
                Data = _data
            };
        }
        #endregion
        #region API Actions
        /// <summary>
        /// Select All query
        /// </summary>
        /// <returns>Rest Response with select all</returns>
        public virtual async Task<RestResponse> SelectAll()
        {
            return GetErrorReponse("TODO");
        }
        /// <summary>
        /// Select query
        /// </summary>
        /// <returns>Rest Response with select</returns>
        public virtual async Task<RestResponse> Select()
        {
            return GetErrorReponse("TODO");
        }
        /// <summary>
        /// Create query
        /// </summary>
        /// <returns>Rest Response with success/fail</returns>
        public virtual async Task<RestResponse> Create()
        {
            return GetErrorReponse("TODO");
        }
        /// <summary>
        /// Update query
        /// </summary>
        /// <returns>Rest Response with success/fail</returns>
        public virtual async Task<RestResponse> Update()
        {
            return GetErrorReponse("TODO");
        }
        /// <summary>
        /// Delete query
        /// </summary>
        /// <returns>Rest Response with success/fail</returns>
        public virtual async Task<RestResponse> Delete()
        {
            return GetErrorReponse("TODO");
        }
        /// <summary>
        /// Not found
        /// </summary>
        /// <returns>Rest Response with not found</returns>
        public virtual RestResponse None()
        {
            return GetErrorReponse("TODO");
        }
        #endregion
    }
}