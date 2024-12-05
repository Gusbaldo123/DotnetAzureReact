using System.Text.Json.Serialization;

namespace WebApiDotNet.Models
{
    public class Auth
    {
        [JsonPropertyName("email")] public string? Email {get; set;}
        [JsonPropertyName("password")] public string? Password {get; set;}
    }
}