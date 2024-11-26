using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Classes;

namespace WebApiDotNet.Utils
{
    public class CourseContext : DbContext
    {
        public CourseContext(DbContextOptions<CourseContext> options) : base(options) { }

        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseVideo> CourseVideos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Videos)
                .WithOne(v => v.Course)
                .HasForeignKey(v => v.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CourseVideo>()
                .HasKey(cv => new { cv.CourseId, cv.VideoId });

            base.OnModelCreating(modelBuilder);
        }

    }

}