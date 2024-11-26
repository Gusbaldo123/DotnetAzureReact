using WebApiDotNet.Classes;
using WebApiDotNet.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApiDotNet.Utils
{
    public class CourseApiCall : IApiCaller
    {
        Course Course;
        CourseContext courseContext;
        public CourseApiCall(Course _course, CourseContext _courseContext)
        {
            Course = _course;
            courseContext = _courseContext;
        }
        public async Task<RestResponse> SelectAll()
        {
            try
            {
                var courses = await courseContext.Courses
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

                return new RestResponse()
                {
                    Success = true,
                    Data = courses
                };
            }
            catch (Exception ex)
            {
                return new RestResponse()
                {
                    Success = true,
                    Data = "Error: " + ex.Message
                };
            }
        }
        public async Task<RestResponse> Select()
        {
            return new RestResponse()
            {
                Success = true,
                Data = "Error: TODO"
            };
        }
        public async Task<RestResponse> Create()
        {
            return new RestResponse()
            {
                Success = true,
                Data = "Error: TODO"
            };
        }
        public async Task<RestResponse> UPDATE()
        {
            return new RestResponse()
            {
                Success = true,
                Data = "Error: TODO"
            };
        }
        public async Task<RestResponse> Delete()
        {
            return new RestResponse()
            {
                Success = true,
                Data = "Error: TODO"
            };
        }
        public async Task<RestResponse> None()
        {
            return new RestResponse()
            {
                Success = true,
                Data = "Error: TODO"
            };
        }
    }
}