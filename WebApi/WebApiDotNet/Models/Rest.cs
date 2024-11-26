using WebApiDotNet.Classes;

namespace WebApiDotNet.Models
{
    public class RestResponse
    {
        public bool Success { get; set; }
        public object Data { get; set; }

    }

    public class RestAction
    {
        int action;
        object? dataParam;
        
        public int Action { get => action; set => action = value; }
        public object? DataParam { get => dataParam; set => dataParam = value; }
    }

    public enum ActionType
    {
        SELECT_ALL, SELECT, CREATE, UPDATE, DELETE, NONE
    }
}