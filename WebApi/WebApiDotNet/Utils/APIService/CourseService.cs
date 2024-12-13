using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class CourseService : CrudApiService<Course>
    {
        public CourseService(Course? _ObjParameter, ApplicationContext _dbContext) : base(_ObjParameter, _dbContext) { }

        #region Handlers
        public override bool isDataFilled(Course? _course) =>
        _course != null &&
        !string.IsNullOrEmpty(_course.Title) &&
        !string.IsNullOrEmpty(_course.ImageBase64) &&
        !string.IsNullOrEmpty(_course.Description) &&
        _course.Videos != null;
        #region CRUD Actions
        public override async Task<RestResponse> SelectByIdList(int[] _idList)
        {
            List<int> idList = _idList.ToList();
            if (idList.Count <= 0) return GetErrorReponse("Id list must not be empty");
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
                    videoList = c.Videos
                        .Select(v => new
                        {
                            VideoUrl = v.VideoUrl,
                            VideoTitle = v.VideoTitle
                        }).ToList()
                })
                .Where(c => c.id != null && idList.Contains((int)c.id))
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
                        videoList = c.Videos
                        .Select(v => new
                        {
                            VideoUrl = v.VideoUrl,
                            VideoTitle = v.VideoTitle
                        }).ToList()
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
                var course = await dbContext.Courses
                    .Include(c => c.Videos)
                    .Where(c => c.Id == ObjParameter.Id)
                    .Select(c => new
                    {
                        id = c.Id,
                        Title = c.Title,
                        ImageBase64 = c.ImageBase64,
                        Description = c.Description,
                        videoList = c.Videos
                        .Select(v => new
                        {
                            VideoUrl = v.VideoUrl,
                            VideoTitle = v.VideoTitle
                        }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (course == null)
                    return GetErrorReponse("Course not found");

                return GetDataResponse(course);
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
                {
                    foreach (CourseVideo vid in list)
                    {
                        vid.Id = default;
                        vid.FKCourseId = ObjParameter.Id;
                        vid.Course = ObjParameter;
                        var response = await new VideoService(vid, dbContext).Create();
                        if (!response.Success)
                            return GetErrorReponse($"Error adding video: {response.Data}");
                    }
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
            if (!isDataFilled(ObjParameter))
                return GetErrorReponse("Parameter not entirely filled");

            try
            {
                var existingVideos = dbContext.CourseVideos.Where(cv => cv.FKCourseId == ObjParameter.Id).ToList();
                var videosToRemove = existingVideos.Where(ev => !ObjParameter.Videos.Any(v => v.Id == ev.Id)).ToList();
                dbContext.CourseVideos.RemoveRange(videosToRemove);


                foreach (var video in ObjParameter.Videos)
                {
                    if (video.Id == 0)
                    {
                        video.FKCourseId = ObjParameter.Id;
                        var videoApiCall = new VideoService(video, dbContext);
                        var response = await videoApiCall.Create();
                        if (!response.Success) return GetErrorReponse($"Error adding video: {response.Data}");
                    }
                    else
                    {
                        var existingVideo = existingVideos.FirstOrDefault(ev => ev.Id == video.Id);
                        if (existingVideo != null)
                        {
                            existingVideo.VideoUrl = video.VideoUrl;
                            existingVideo.VideoTitle = video.VideoTitle;
                            var videoApiCall = new VideoService(existingVideo, dbContext);
                            var response = await videoApiCall.Update();
                            if (!response.Success) return GetErrorReponse($"Error updating video: {response.Data}");
                        }
                        else
                        {
                            video.FKCourseId = ObjParameter.Id;
                            var videoApiCall = new VideoService(video, dbContext);
                            var response = await videoApiCall.Create();
                            if (!response.Success) return GetErrorReponse($"Error adding new video with ID {video.Id}: {response.Data}");
                        }
                    }
                }

                dbContext.Courses.Update(ObjParameter);
                await dbContext.SaveChangesAsync();
                return GetDataResponse("Course and videos updated successfully");
            }
            catch (Exception ex)
            {
                var errorMessage = $"Error: {ex.Message}";
                return GetErrorReponse(errorMessage);
            }
        }
        public override async Task<RestResponse> Delete()
        {
            if (ObjParameter == null) return GetErrorReponse("Parameter must not be null");
            if (ObjParameter.Id == null) return GetErrorReponse("Id must not be null");

            try
            {
                var courseToDelete = await dbContext.Courses
                    .Include(c => c.Videos)
                    .FirstOrDefaultAsync(c => c.Id == ObjParameter.Id);

                if (courseToDelete == null)
                {
                    return GetErrorReponse("Course not found or already deleted.");
                }

                var videosToDelete = new List<CourseVideo>(courseToDelete.Videos);

                foreach (var video in videosToDelete)
                {
                    var videoApiCall = new VideoService(video, dbContext);
                    var videoDeleteResponse = await videoApiCall.Delete();
                    if (!videoDeleteResponse.Success)
                    {
                        return GetErrorReponse($"Error deleting video: {videoDeleteResponse.Data}");
                    }
                }

                dbContext.Courses.Remove(courseToDelete);

                var rowsAffected = await dbContext.SaveChangesAsync();

                if (rowsAffected == 0)
                {
                    return GetErrorReponse("Course could not be deleted due to concurrent modification.");
                }

                return GetDataResponse("Course and related videos removed successfully.");
            }
            catch (Exception ex)
            {
                return GetErrorReponse(ex.Message);
            }
        }
        #endregion
        #endregion
    }
}
