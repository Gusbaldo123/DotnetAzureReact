using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class UserService : CrudApiService<User>
    {
        public UserService(User? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }
        #region API Actions
        public async override Task<RestResponse> SelectAll()
        {
            try
            {
                var users = await dbContext.Users
                    .Include(u => u.CourseList).ThenInclude(cl => cl.VideoList)
                    .Select(u => new
                    {
                        id = u.Id,
                        email = u.Email,
                        isStudent = u.IsStudent,
                        firstName = u.FirstName,
                        surname = u.Surname,
                        phone = u.Phone,
                        courseList = u.CourseList.Select(cl => new
                        {
                            id = cl.Id,
                            fkUserId = cl.FKUserId,
                            completionList = cl.VideoList.Select(cc => new
                            {
                                id = cc.Id,
                                fkListId = cc.FKListId,
                                isComplete = cc.IsWatched
                            })
                        })
                    })
                    .ToListAsync();

                return GetDataResponse(users);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public async override Task<RestResponse> Select()
        {
            if (ObjParameter == null)
                return GetErrorReponse("User Parameter must not be null");

            if (ObjParameter.Id <= 0)
                return GetErrorReponse("Invalid User ID");

            try
            {
                var user = await dbContext.Users
                    .Include(u => u.CourseList).ThenInclude(cl => cl.VideoList)
                    .Where(u => u.Id == ObjParameter.Id)
                    .Select(u => new
                    {
                        id = u.Id,
                        email = u.Email,
                        isStudent = u.IsStudent,
                        firstName = u.FirstName,
                        surname = u.Surname,
                        phone = u.Phone,
                        courseList = u.CourseList.Select(cl => new
                        {
                            id = cl.Id,
                            completionList = cl.VideoList.Select(cc => cc.IsWatched)
                        })
                    })
                    .FirstOrDefaultAsync();

                if (user == null)
                    return GetErrorReponse("User not found");

                return GetDataResponse(user);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public async override Task<RestResponse> Create()
        {
            if (ObjParameter == null)
                return GetErrorReponse("User Parameter must not be null");

            try
            {
                ObjParameter.Id = default;
                ObjParameter.CourseList = new List<UserCourse>();
                await dbContext.Users.AddAsync(ObjParameter);
                await dbContext.SaveChangesAsync();

                return GetDataResponse("User created successfully");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public async override Task<RestResponse> Update()
        {
            if (ObjParameter == null)
                return GetErrorReponse("User Parameter must not be null");

            try
            {
                var userToUpdate = await dbContext.Users
                    .Include(u => u.CourseList)
                    .ThenInclude(c => c.VideoList)
                    .FirstOrDefaultAsync(u => u.Id == ObjParameter.Id);

                if (userToUpdate == null)
                    return GetErrorReponse("User not found");

                userToUpdate.Email = ObjParameter.Email;
                userToUpdate.Password = ObjParameter.Password;
                userToUpdate.IsStudent = ObjParameter.IsStudent;
                userToUpdate.FirstName = ObjParameter.FirstName;
                userToUpdate.Surname = ObjParameter.Surname;
                userToUpdate.Phone = ObjParameter.Phone;

                foreach (var course in ObjParameter.CourseList)
                {
                    var existingCourse = userToUpdate.CourseList.FirstOrDefault(c => c.Id == course.Id);

                    if (existingCourse != null)
                    {
                        existingCourse.VideoList.Clear();
                        foreach (var video in course.VideoList)
                        {
                            existingCourse.VideoList.Add(new UserVideo
                            {
                                IsWatched = video.IsWatched,
                                FKListId = existingCourse.Id
                            });
                        }
                    }
                    else
                    {
                        var newCourse = new UserCourse
                        {
                            FKUserId = userToUpdate.Id,
                            VideoList = course.VideoList.Select(video => new UserVideo
                            {
                                IsWatched = video.IsWatched
                            }).ToList()
                        };
                        userToUpdate.CourseList.Add(newCourse);
                    }
                }

                // Salvar mudanças
                await dbContext.SaveChangesAsync();

                return GetDataResponse("User updated successfully");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.InnerException?.Message ?? ex.Message);
            }
        }
        public async override Task<RestResponse> Delete()
        {
            if (ObjParameter == null)
                return GetErrorReponse("User Parameter must not be null");

            var userExists = await dbContext.Users
                .Include(u => u.CourseList)
                .ThenInclude(cl => cl.VideoList)
                .FirstOrDefaultAsync(u => u.Id == ObjParameter.Id);

            if (userExists == null)
                return GetErrorReponse("User not found");

            foreach (var course in userExists.CourseList)
                dbContext.UserVideos.RemoveRange(course.VideoList);

            dbContext.UserCourses.RemoveRange(userExists.CourseList);
            dbContext.Users.Remove(userExists);

            await dbContext.SaveChangesAsync();

            return GetDataResponse("Removed Successfully");
        }
        #endregion
    }
}