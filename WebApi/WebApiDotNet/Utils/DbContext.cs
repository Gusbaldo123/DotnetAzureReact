using Microsoft.EntityFrameworkCore;
using WebApiDotNet.Models;

namespace WebApiDotNet.Utils
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseVideo> CourseVideos { get; set; }
        public DbSet<User> Users { get; set; }

        #region Handlers
        protected override void OnModelCreating(ModelBuilder _modelBuilder)
        {
            _modelBuilder.Entity<Course>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Title).IsRequired().HasMaxLength(200);
                entity.Property(c => c.Description).HasMaxLength(500);
                entity.Property(c => c.ImageBase64).IsRequired();
                entity.HasMany(c => c.Videos)
                      .WithOne(v => v.Course)
                      .HasForeignKey(v => v.FKCourseId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            _modelBuilder.Entity<CourseVideo>(entity =>
            {
                entity.HasKey(cv => cv.Id);

                entity.Property(cv => cv.CourseVideoUrl)
                      .IsRequired()
                      .HasMaxLength(500);
                      
                entity.HasOne(cv => cv.Course)
                      .WithMany(c => c.Videos)
                      .HasForeignKey(cv => cv.FKCourseId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(_modelBuilder);
        }
        #endregion

    }
}
