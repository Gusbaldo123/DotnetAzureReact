using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Classes;

namespace WebApiDotNet.Utils
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseVideo> CourseVideos { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder _modelBuilder)
        {
            _modelBuilder.Entity<Course>()
                .HasMany(c => c.Videos)
                .WithOne(v => v.Course)
                .HasForeignKey(v => v.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            _modelBuilder.Entity<CourseVideo>()
                .HasKey(cv => new { cv.CourseId, cv.VideoId });


            base.OnModelCreating(_modelBuilder);
        }
    }
}
