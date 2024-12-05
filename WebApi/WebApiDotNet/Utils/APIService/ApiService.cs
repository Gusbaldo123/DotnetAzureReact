using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class ApiService<T>
    {
        /// <summary>
        /// Entity Framework Core DbContext
        /// </summary>
        protected ApplicationContext dbContext;
        /// <summary>
        /// JSON data Parameter
        /// </summary>
        protected T? ObjParameter;
        public ApiService(T? _ObjParameter, ApplicationContext _dbContext)
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
    }
}