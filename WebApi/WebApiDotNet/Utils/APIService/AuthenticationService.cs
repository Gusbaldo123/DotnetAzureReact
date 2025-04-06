using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;
using System.Net.Mail;

namespace WebApiDotNet.Utils
{
    class AuthenticationService : ApiService<Auth>
    {
        public AuthenticationService(Auth? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }
        public async Task<RestResponse> AuthUser()
        {
            if (ObjParameter == null)
                return GetErrorReponse("User Parameter must not be null");

            if (ObjParameter.Email == null || ObjParameter.Password == null)
                return GetErrorReponse("Email and Password must not be null");
            try
            {
                var user = await dbContext.Users
                    .Where(u => u.Email.ToLower() == ObjParameter.Email.ToLower() && u.Password == ObjParameter.Password)
                    .Select(u => new
                    {
                        id = u.Id,
                        email = u.Email,
                        isStudent = u.IsStudent,
                        firstName = u.FirstName,
                        surname = u.Surname,
                        phone = u.Phone,
                        isAuthenticated = u.IsAuthenticated,
                        courseList = u.CourseList.Select(cl => new
                        {
                            id = cl.Id,
                            fkCourseId = cl.FKCourseId,
                            videoList = cl.VideoList.Select(cc => new
                            {
                                isWatched = cc.IsWatched
                            })
                        })
                    }).FirstOrDefaultAsync();
                if (user == null)
                    return GetErrorReponse("Password or Email incorrect");

                if (user.isAuthenticated == false)
                {
                    string response = string.Format("User not authenticated, check '{0}' for authentication (maybe it's on spam folder)",user.email.ToLower());
                    return GetErrorReponse(response);
                }

                return GetDataResponse(user);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        async Task<bool?> DbContainsEmail(string email)
        {
            try
            {
                var user = await dbContext.Users.Where(u => u.Email.ToLower() == email.ToLower()).Select(u => new
                {
                    id = u.Id,
                    email = u.Email
                }).FirstOrDefaultAsync();

                if (user == null) return false;
                else return true;
            }
            catch (System.Exception ex)
            {
                return null;
            }
        }
        bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }
        async Task<bool> UsableEmail(string email)
        {
            bool? emailFree = !await DbContainsEmail(email);
            bool usableEmail = IsValidEmail(email);

            if (emailFree == true && usableEmail)
                return true;
            else return false;
        }
        public async Task<RestResponse> AuthMail()
        {
            return new RestResponse();
        }
    }
}