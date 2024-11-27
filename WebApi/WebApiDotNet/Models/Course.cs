using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace WebApiDotNet.Classes
{
    public class Course
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("imageBase64")]
        public string ImageBase64 { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("videos")]
        public List<CourseVideo> Videos { get; set; }
    }

    public class CourseVideo
    {
        [JsonPropertyName("videoId")]
        public int VideoId { get; set; }

        [JsonPropertyName("courseId")]
        public int CourseId { get; set; }

        [JsonPropertyName("videoUrl")]
        public string VideoUrl { get; set; }

        [JsonPropertyName("course")]
        public Course Course { get; set; }
    }

}
