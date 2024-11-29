using System.Text.Json.Serialization;

namespace WebApiDotNet.Models
{
    public class Course
    {
        [JsonPropertyName("id")] public int Id { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
        [JsonPropertyName("imageBase64")] public string ImageBase64 { get; set; }
        [JsonPropertyName("description")] public string Description { get; set; }
        [JsonPropertyName("videoList")] public List<CourseVideo> Videos { get; set; }
    }
    public class CourseVideo
    {
        [JsonPropertyName("id")] public int Id { get; set; }
        [JsonPropertyName("fkCourseId")] public int FKCourseId { get; set; }
        [JsonPropertyName("courseVideoUrl")] public string CourseVideoUrl { get; set; }
        [JsonIgnore] public Course Course { get; set; }
    }
}
