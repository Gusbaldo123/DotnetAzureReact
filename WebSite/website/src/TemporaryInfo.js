module.exports= {
  CourseInfo:function(){
    return [
      {
        id:0,
        Title: "Become a Professional Swimmer",
        Img: require("./assets/ProSwimmer.png"),
        Description:"Become a Professional Swimmer! 🏊💦 Ready to transform your relationship with water from 'barely floating' to 'gliding like a dolphin'? Our course will teach you all the essentials—like not holding your breath until you’re blue! Learn the strokes, the flips, and maybe even the art of gracefully wearing goggles. Sign up now, and let’s make waves together! (Flippers not included)",
        videoList:["https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0"]
      },
      {
        id:1,
        Title: "How to reach the moon",
        Img: require("./assets/ReachMoon.png"),
        Description:"How to Reach the Moon! 🚀✨ Dreaming of moonwalks but stuck on planet Earth? This course covers everything you need to know about lunar ambition—minus the rocket science. We’ll guide you through goal-setting, gravity-defying mindset hacks, and maybe even a DIY helmet session! Whether you’re aiming for the moon or just a higher paycheck, we’ve got you covered. Let’s launch your dreams into orbit!",
        videoList:["https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0"]
      },
      {
        id:2,
        Title: "Learn to Code",
        Img: require("./assets/LearnCode.png"),
        Description:"Learn to Code! 💻✨ Tired of calling tech support for help with your computer? With this course, you’ll go from ‘What’s a variable?’ to coding wizard in no time! We’ll teach you to speak computer—minus the awkward small talk—and unlock the secrets of loops, logic, and maybe a line or two of *mysterious* code magic. Warning: side effects may include feeling like a genius. Sign up, and let’s turn caffeine into code!",
        videoList:["https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0"]
      },
      {
        id:3,
        Title: "Mastering Photography",
        Img: require("./assets/Photography.png"),
        Description:"Mastering Photography! 📸✨ Say goodbye to blurry vacation pics and awkward selfies—this course will take you from 'accidental thumb in the frame' to 'capturing magic with every shot.' Learn about lighting, angles, and how to look like you totally meant to take that artsy photo of your morning coffee. Soon, you’ll be snapping like a pro (and maybe even saying fancy things like ‘golden hour’). Click, enroll, and let’s make you a shutterbug star!",
        videoList:["https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0","https://www.youtube.com/watch?v=xvFZjo5PgG0"]
      },
    ]
  },
  UserInfo:function(){
    return [
      {
        "Id":0,
        "Email":"admin@skillhub.com",
        "Password":"123",
        "isStudent":false,
        "Firstname":"Admin",
        "Surname":"SkillHub",
        "Phone":"+000 000 000 000",
        "CourseList":[
          {
            "id":0,
            "videoList":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
          },
          {
            "id":1,
            "videoList":[true,true,true]
          },
          {
            "id":2,
            "videoList":[true,true,false]
          }
        ]
      },
      {
        "Id":1,
        "Email":"Test@skillhub.com",
        "Password":"123",
        "isStudent":true,
        "Firstname":"Test",
        "Surname":"SkillHub",
        "Phone":"+000 000 000 000",
        "CourseList":[]
      }
    ]
  }
}