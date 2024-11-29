using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

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
                       videoList = c.Videos.Select(v => v.CourseVideoUrl).ToList()
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
                    videoList = c.Videos.Select(v => v.CourseVideoUrl).ToList()
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
            if (ObjParameter == null)
                return GetErrorReponse("Course Parameter must not be null");

            List<CourseVideo> list = new List<CourseVideo>();
            bool hasVideos = ObjParameter.Videos.Count > 0;

            if (hasVideos)
            {
                list = new List<CourseVideo>(ObjParameter.Videos);
                ObjParameter.Videos.Clear();
            }

            try
            {
                ObjParameter.Id = default;
                await dbContext.Courses.AddAsync(ObjParameter);
                await dbContext.SaveChangesAsync();

                if (hasVideos)
                    foreach (CourseVideo vid in list)
                    {
                        vid.FKCourseId = ObjParameter.Id;
                        vid.Course = ObjParameter;
                        var response = await new VideoApiCall(vid, dbContext).Create();
                        if (!response.Success)
                            return GetErrorReponse($"Error adding video: {response.Data}");
                    }

                return GetDataResponse("Course and videos added successfully");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> Update()
        {
            if (ObjParameter == null) return GetErrorReponse("Course Parameter must not be null");
            dbContext.CourseVideos.RemoveRange(dbContext.CourseVideos.Where(cv => cv.FKCourseId == ObjParameter.Id));

            try
            {
                dbContext.Courses.Update(ObjParameter);
                await dbContext.SaveChangesAsync();

                return GetDataResponse("Updated Successfully");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> Delete()
        {
            if (ObjParameter == null) return GetErrorReponse("Course Parameter must not be null");

            dbContext.CourseVideos.RemoveRange(dbContext.CourseVideos.Where(cv => cv.FKCourseId == ObjParameter.Id));
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