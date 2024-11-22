namespace WebApiDotNet.Classes
{
    public class Course
    {
        private int id;
        private string title;
        private string imageBase64;
        private string description;
        private List<string> videoList;

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string ImageBase64 { get => imageBase64; set => imageBase64 = value; }
        public string Description { get => description; set => description = value; }
        public List<string> VideoList { get => videoList; set => videoList = value; }
    }
}