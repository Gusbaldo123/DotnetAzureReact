using System.Text.Json.Serialization;

namespace WebApiDotNet.Models
{
    public class User
    {
        [JsonPropertyName("id")] public int Id { get; set; }
        [JsonPropertyName("email")] public string Email { get; set; }
        [JsonPropertyName("password")] public string Password { get; set; }
        [JsonPropertyName("isStudent")] public bool IsStudent { get; set; }
        [JsonPropertyName("firstName")] public string FirstName { get; set; }
        [JsonPropertyName("surname")] public string Surname { get; set; }
        [JsonPropertyName("phone")] public string Phone { get; set; }
        [JsonPropertyName("courseList")] public List<UserCourseList> CourseList { get; set; }
    }
    public class UserCourseList
    {
        [JsonPropertyName("id")] public int Id { get; set; }
        [JsonPropertyName("fkUserId")] public int FKUserId { get; set; }
        [JsonPropertyName("completionList")] public List<UserCourseCompletion> CompletionList { get; set; }
        [JsonIgnore] public User User { get; set; }
    }
    public class UserCourseCompletion
    {
        [JsonPropertyName("id")] public int Id { get; set; }
        [JsonPropertyName("fkCourseId")] public int FKListId { get; set; }
        [JsonPropertyName("isComplete")] public bool IsComplete { get; set; }
        [JsonIgnore] public UserCourseList UserCourseList { get; set; }
    }
}
