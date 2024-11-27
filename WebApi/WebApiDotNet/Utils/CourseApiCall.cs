using WebApiDotNet.Classes;
using WebApiDotNet.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApiDotNet.Utils
{
    public class CourseApiCall : ApiCaller<Course>
    {
        public CourseApiCall(Course? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }
        #region API Actions
        public override async Task<RestResponse> SelectAll()
        {
            try
            {
                var courses = await dbContext.Courses
                   .Include(c => c.Videos)
                   .Select(c => new
                   {
                       id = c.Id,
                       Title = c.Title,
                       ImageBase64 = c.ImageBase64,
                       Description = c.Description,
                       videoList = c.Videos.Select(v => v.VideoUrl).ToList()
                   })
                   .ToListAsync();

                return GetDataResponse(courses);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> Select()
        {
            if (ObjParameter == null) return GetErrorReponse("Course Parameter must not be null");

            try
            {
                var courses = await dbContext.Courses
                .Include(c => c.Videos)
                .Where(c => c.Id == ObjParameter.Id)
                .Select(c => new
                {
                    id = c.Id,
                    Title = c.Title,
                    ImageBase64 = c.ImageBase64,
                    Description = c.Description,
                    videoList = c.Videos.Select(v => v.VideoUrl).ToList()
                })
                .ToListAsync();


                return GetDataResponse(courses);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> Create()
        {
            if (ObjParameter == null) return GetErrorReponse("Course Parameter must not be null");

            await dbContext.Courses.AddAsync(ObjParameter);
            await dbContext.SaveChangesAsync();

            return GetDataResponse("Added Successfully");
        }
        public override async Task<RestResponse> Update()
        {
            if (ObjParameter == null) return GetErrorReponse("Course Parameter must not be null");

            dbContext.Courses.Update(ObjParameter);
            await dbContext.SaveChangesAsync();

            return GetDataResponse("Updated Successfully");
        }
        public override async Task<RestResponse> Delete()
        {
            if (ObjParameter == null) return GetErrorReponse("Course Parameter must not be null");

            dbContext.Courses.Remove(ObjParameter);
            await dbContext.SaveChangesAsync();

            return GetDataResponse("Removed Successfully");
        }
        public override RestResponse None()
        {
            return GetErrorReponse("Action not found");
        }
        #endregion
    }
}