using System.Diagnostics.CodeAnalysis;

namespace WebApiDotNet.Classes
{
    public class Course
    {
        private int id;
        private string title;
        private string imageBase64;
        private string description;
        private List<CourseVideo> videos;

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string ImageBase64 { get => imageBase64; set => imageBase64 = value; }
        public string Description { get => description; set => description = value; }
        public List<CourseVideo> Videos { get => videos; set => videos = value; }
    }

    public class CourseVideo
    {
        private int videoId;
        private int courseId;
        private string videoUrl;
        private Course course;

        public int VideoId { get => videoId; set => videoId = value; }
        public int CourseId { get => courseId; set => courseId = value; }
        public string VideoUrl { get => videoUrl; set => videoUrl = value; }
        public Course Course { get => course; set => course = value; }
    }

}
