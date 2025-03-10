using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class VideoService : CrudApiService<CourseVideo>
    {
        public VideoService(CourseVideo? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }
        #region Handlers
        public override bool isDataFilled(CourseVideo? _vid) =>
        _vid != null &&
        _vid.FKCourseId != null &&
        !string.IsNullOrEmpty(_vid.VideoUrl) &&
        !string.IsNullOrEmpty(_vid.VideoTitle);
        #region CRUD Actions
        public override async Task<RestResponse> SelectByIdList(int[] _idList)
        {
            List<int> idList = _idList.ToList();
            if (idList.Count <= 0) return GetErrorReponse("Id list must not be empty");
            try
            {
                var courses = await dbContext.CourseVideos
                .Select(c => new
                {
                    id = c.Id,
                    VideoUrl = c.VideoUrl,
                    VideoTitle = c.VideoTitle,
                    FKCourseId = c.FKCourseId
                })
                .Where(v => v.id != null && idList.Contains((int)v.id))
                .ToListAsync();


                return GetDataResponse(courses);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> SelectAll()
        {
            if (ObjParameter == null) return GetErrorReponse("Video Parameter must not be null");

            try
            {
                var courses = await dbContext.CourseVideos
                .Select(c => new
                {
                    id = c.Id,
                    VideoUrl = c.VideoUrl,
                    VideoTitle = c.VideoTitle,
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
        public override async Task<RestResponse> Select()
        {
            if (ObjParameter == null) return GetErrorReponse("Parameter must not be null");
            if (ObjParameter.Id == null) return GetErrorReponse("Id must not be null");

            try
            {
                var courses = await dbContext.CourseVideos
                .Where(c => c.Id == ObjParameter.Id)
                .Select(c => new
                {
                    id = c.Id,
                    VideoUrl = c.VideoUrl,
                    VideoTitle = c.VideoTitle,
                    FKCourseId = c.FKCourseId
                })
                .FirstOrDefaultAsync();

                if (courses == null)
                    return GetErrorReponse("Video not found");

                return GetDataResponse(courses);
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        public override async Task<RestResponse> Create()
        {
            if (!isDataFilled(ObjParameter))
                return GetErrorReponse("Parameter not entirely filled");

            try
            {
                ObjParameter.Id = default;
                if (ObjParameter.Course != null)
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
            if (!isDataFilled(ObjParameter))
                return GetErrorReponse("Parameter not entirely filled");

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
            if (ObjParameter == null) return GetErrorReponse("Parameter must not be null");
            if (ObjParameter.Id == null) return GetErrorReponse("Id must not be null");

            var video = await dbContext.CourseVideos.FindAsync(ObjParameter.Id);

            if (video == null) return GetErrorReponse("Error: Video not found or already deleted.");

            dbContext.CourseVideos.Remove(video);
            await dbContext.SaveChangesAsync();

            return GetDataResponse("Removed Successfully");
        }

        #endregion
        #endregion
    }
}