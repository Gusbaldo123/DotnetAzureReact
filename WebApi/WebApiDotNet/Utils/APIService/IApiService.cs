using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public interface ICrudApiService
    {
        #region Handlers
        public Task<RestResponse> SelectAll();
        public Task<RestResponse> Select();
        public Task<RestResponse> Create();
        public Task<RestResponse> Update();
        public Task<RestResponse> Delete();
        public RestResponse None();
        #endregion
    }
}