
using Microsoft.AspNetCore.Mvc;
using WebApiDotNet.Classes;

namespace WebApiDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return new List<Course>
            {
                new Course
                {
                    Id = 0,
                    Title = "Become a Professional Swimmer",
                    ImageBase64 = "", // Atualize com o base64 ou deixe vazio
                    Description = "Become a Professional Swimmer! 🏊💦 Ready to transform your relationship with water from 'barely floating' to 'gliding like a dolphin'? Our course will teach you all the essentials—like not holding your breath until you’re blue! Learn the strokes, the flips, and maybe even the art of gracefully wearing goggles. Sign up now, and let’s make waves together! (Flippers not included)",
                    VideoList = new List<string>
                    {
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0"
                    }
                },
                new Course
                {
                    Id = 1,
                    Title = "How to reach the moon",
                    ImageBase64 = "", // Atualize com o base64 ou deixe vazio
                    Description = "How to Reach the Moon! 🚀✨ Dreaming of moonwalks but stuck on planet Earth? This course covers everything you need to know about lunar ambition—minus the rocket science. We’ll guide you through goal-setting, gravity-defying mindset hacks, and maybe even a DIY helmet session! Whether you’re aiming for the moon or just a higher paycheck, we’ve got you covered. Let’s launch your dreams into orbit!",
                    VideoList = new List<string>
                    {
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0"
                    }
                },
                new Course
                {
                    Id = 2,
                    Title = "Learn to Code",
                    ImageBase64 = "", // Atualize com o base64 ou deixe vazio
                    Description = "Learn to Code! 💻✨ Tired of calling tech support for help with your computer? With this course, you’ll go from ‘What’s a variable?’ to coding wizard in no time! We’ll teach you to speak computer—minus the awkward small talk—and unlock the secrets of loops, logic, and maybe a line or two of *mysterious* code magic. Warning: side effects may include feeling like a genius. Sign up, and let’s turn caffeine into code!",
                    VideoList = new List<string>
                    {
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0"
                    }
                },
                new Course
                {
                    Id = 3,
                    Title = "Mastering Photography",
                    ImageBase64 = "", // Atualize com o base64 ou deixe vazio
                    Description = "Mastering Photography! 📸✨ Say goodbye to blurry vacation pics and awkward selfies—this course will take you from 'accidental thumb in the frame' to 'capturing magic with every shot.' Learn about lighting, angles, and how to look like you totally meant to take that artsy photo of your morning coffee. Soon, you’ll be snapping like a pro (and maybe even saying fancy things like ‘golden hour’). Click, enroll, and let’s make you a shutterbug star!",
                    VideoList = new List<string>
                    {
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0",
                        "https://www.youtube.com/watch?v=xvFZjo5PgG0"
                    }
                }
            };
        }
    }
}