using WebApiDotNet.Classes;
using WebApiDotNet.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApiDotNet.Utils
{
    public class ApiCaller<T> : IApiCaller
    {
        protected ApplicationContext dbContext;
        protected T? ObjParameter;
        public ApiCaller(T? _ObjParameter, ApplicationContext _dbContext)
        {
            ObjParameter = _ObjParameter;
            dbContext = _dbContext;
        }
        #region REST Responses
        protected RestResponse GetErrorReponse(string _message)
        {
            return new RestResponse()
            {
                Success = false,
                Data = "Error: " + _message
            };
        }
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
        public virtual async Task<RestResponse> SelectAll()
        {
            return GetErrorReponse("TODO");
        }
        public virtual async Task<RestResponse> Select()
        {
            return GetErrorReponse("TODO");
        }
        public virtual async Task<RestResponse> Create()
        {
            return GetErrorReponse("TODO");
        }
        public virtual async Task<RestResponse> Update()
        {
            return GetErrorReponse("TODO");
        }
        public virtual async Task<RestResponse> Delete()
        {
            return GetErrorReponse("TODO");
        }
        public virtual RestResponse None()
        {
            return GetErrorReponse("TODO");
        }
        #endregion
    }
}