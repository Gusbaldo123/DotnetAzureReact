using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace WebApiDotNet.Models
{
    public class RestResponse
    {
        public bool Success { get; set; }
        public object? Data { get; set; }
    }

    public class CRUDAction
    {
        [Required] public int? Action { get; set; }
        [Required] public JsonElement? DataParam { get; set; }
    }
    public enum CRUDActionType
    {
        SELECT_ALL, SELECT, CREATE, UPDATE, DELETE
    }
}