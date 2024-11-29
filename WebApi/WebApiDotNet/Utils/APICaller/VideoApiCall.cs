using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class VideoApiCall : ApiCaller<CourseVideo>
    {
        public VideoApiCall(CourseVideo? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }
        #region API Actions
        public override async Task<RestResponse> Select()
        {
            if (ObjParameter == null) return GetErrorReponse("Video Parameter must not be null");

            try
            {
                var courses = await dbContext.CourseVideos
                .Where(c => c.Id == ObjParameter.Id)
                .Select(c => new
                {
                    id = c.Id,
                    CourseVideoUrl = c.CourseVideoUrl,
                    FKCourseId = c.FKCourseId
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
                return GetErrorReponse("Video Parameter must not be null");

            if (string.IsNullOrEmpty(ObjParameter.CourseVideoUrl))
                return GetErrorReponse("Video URL must not be null or empty");

            try
            {
                ObjParameter.Id = default;
                if(ObjParameter.Course!=null)
                    ObjParameter.FKCourseId = ObjParameter.Course.Id;
                await dbContext.CourseVideos.AddAsync(ObjParameter);
                await dbContext.SaveChangesAsync();

                return GetDataResponse("Video added successfully");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> Update()
        {
            if (ObjParameter == null) return GetErrorReponse("Video Parameter must not be null");

            try
            {
                dbContext.CourseVideos.Update(ObjParameter);
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
            if (ObjParameter == null) return GetErrorReponse("Video Parameter must not be null");

            dbContext.CourseVideos.Remove(ObjParameter);
            await dbContext.SaveChangesAsync();

            return GetDataResponse("Removed Successfully");
        }
        #endregion
    }
}