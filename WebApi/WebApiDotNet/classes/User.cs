using System;
using System.ComponentModel.DataAnnotations;

namespace WebApiDotNet.Classes
{
    public class User
    {
        private int id;
        private string email;
        private string password;
        private bool isStudent;
        private string firstName;
        private string surname;
        private string phone;
        private List<UserCourse> courseList;

        [Required]
        public int Id { get => id; set => id = value; }
        [Required]
        [EmailAddress]
        public string Email { get => email; set => email = value; }
        [Required]
        public string Password { get => password; set => password = value; }
        [Required]
        public bool IsStudent { get => isStudent; set => isStudent = value; }
        [Required]
        public string FirstName { get => firstName; set => firstName = value; }
        [Required]
        public string Surname { get => surname; set => surname = value; }
        [Required]
        public string Phone { get => phone; set => phone = value; }
        [Required]
        public List<UserCourse> CourseList { get => courseList; set => courseList = value; }
    }

    public class UserCourse
    {
        private int id;
        private List<bool> isCompleted;

        public int Id { get => id; set => id = value; }
        public List<bool> IsCompleted { get => isCompleted; set => isCompleted = value; }
    }
}
