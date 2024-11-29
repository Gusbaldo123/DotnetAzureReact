using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    class UserApiCall : ApiCaller<User>
    {
        public UserApiCall(User? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }
        #region API Actions
        public async override Task<RestResponse> SelectAll()
        {
            try
            {
                var users = await dbContext.Users
                    .Include(u => u.CourseList).ThenInclude(cl => cl.CompletionList)
                    .Select(u => new
                    {
                        id = u.Id,
                        email = u.Email,
                        password = u.Password, // Remove this
                        isStudent = u.IsStudent,
                        firstName = u.FirstName,
                        surname = u.Surname,
                        phone = u.Phone,
                        courseList = u.CourseList.Select(cl => new
                        {
                            id = cl.Id,
                            fkUserId = cl.FKUserId,
                            completionList = cl.CompletionList.Select(cc => new
                            {
                                id = cc.Id,
                                fkListId = cc.FKListId,
                                isComplete = cc.IsComplete
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
                    .Include(u => u.CourseList).ThenInclude(cl => cl.CompletionList)
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
                            fkUserId = cl.FKUserId,
                            completionList = cl.CompletionList.Select(cc => cc.IsComplete)
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
                var userToUpdate = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == ObjParameter.Id);

                if (userToUpdate == null)
                    return GetErrorReponse("User not found");

                userToUpdate.Email = ObjParameter.Email;
                userToUpdate.Password = ObjParameter.Password;
                userToUpdate.IsStudent = ObjParameter.IsStudent;
                userToUpdate.FirstName = ObjParameter.FirstName;
                userToUpdate.Surname = ObjParameter.Surname;
                userToUpdate.Phone = ObjParameter.Phone;

                await dbContext.SaveChangesAsync();

                return GetDataResponse("User updated successfully");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public async override Task<RestResponse> Delete()
        {
            if (ObjParameter == null)
                return GetErrorReponse("User Parameter must not be null");

            var userExists = await dbContext.Users
                .Include(u => u.CourseList)
                .ThenInclude(cl => cl.CompletionList)
                .FirstOrDefaultAsync(u => u.Id == ObjParameter.Id);

            if (userExists == null)
                return GetErrorReponse("User not found");

            foreach (var course in userExists.CourseList)
                dbContext.userCourseCompletions.RemoveRange(course.CompletionList);

            dbContext.userCourseLists.RemoveRange(userExists.CourseList);
            dbContext.Users.Remove(userExists);

            await dbContext.SaveChangesAsync();

            return GetDataResponse("Removed Successfully");
        }

        #endregion
    }
}