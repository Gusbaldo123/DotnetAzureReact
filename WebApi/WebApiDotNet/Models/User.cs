using System.Text.Json.Serialization;

namespace WebApiDotNet.Models
{
    public class User
    {
        [JsonPropertyName("id")] public int? Id { get; set; }
        [JsonPropertyName("email")] public string? Email { get; set; }
        [JsonPropertyName("password")] public string? Password { get; set; }
        [JsonPropertyName("isStudent")] public bool? IsStudent { get; set; }
        [JsonPropertyName("firstName")] public string? FirstName { get; set; }
        [JsonPropertyName("surname")] public string? Surname { get; set; }
        [JsonPropertyName("phone")] public string? Phone { get; set; }
        [JsonPropertyName("courseList")] public List<UserCourse>? CourseList { get; set; }
    }
    public class UserCourse
    {
        [JsonPropertyName("id")] public int? Id { get; set; }
        [JsonPropertyName("fkUserId")] public int? FKUserId { get; set; }
        [JsonPropertyName("fkCourseId")] public int? FKCourseId { get; set; }
        [JsonPropertyName("videoList")] public List<UserVideo>? VideoList { get; set; }
        [JsonIgnore] public User? User { get; set; }
    }
    public class UserVideo
    {
        [JsonPropertyName("id")] public int? Id { get; set; }
        [JsonPropertyName("fkListId")] public int? FKListId { get; set; }
        [JsonPropertyName("isWatched")] public bool? IsWatched { get; set; }
        [JsonIgnore] public UserCourse? UserCourse { get; set; }
    }
}
