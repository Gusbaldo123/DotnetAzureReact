using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public interface IApiCaller
    {
        public Task<RestResponse> SelectAll();
        public Task<RestResponse> Select();
        public Task<RestResponse> Create();
        public Task<RestResponse> Delete();
        public Task<RestResponse> None();
    }
}