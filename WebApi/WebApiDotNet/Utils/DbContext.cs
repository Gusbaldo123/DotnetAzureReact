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
        public DbSet<UserCourseList> userCourseLists {get;set;}
        public DbSet<UserCourseCompletion> userCourseCompletions {get;set;}

        #region Handlers
        protected override void OnModelCreating(ModelBuilder _modelBuilder)
        {
            _modelBuilder.Entity<Course>(entity =>{
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Title).IsRequired().HasMaxLength(200);
                entity.Property(c => c.Description).HasMaxLength(500);
                entity.Property(c => c.ImageBase64).IsRequired();
                entity.HasMany(c => c.Videos).WithOne(v => v.Course).HasForeignKey(v => v.FKCourseId).OnDelete(DeleteBehavior.Cascade);
            });
            _modelBuilder.Entity<CourseVideo>(entity =>{
                entity.HasKey(cv => cv.Id);
                entity.Property(cv => cv.CourseVideoUrl).IsRequired().HasMaxLength(500);
                entity.HasOne(cv => cv.Course).WithMany(c => c.Videos).HasForeignKey(cv => cv.FKCourseId).OnDelete(DeleteBehavior.Cascade);
            });
            _modelBuilder.Entity<User>(entity=>{
                entity.HasKey(u=> u.Id);
                entity.Property(u=>u.Email).IsRequired().HasMaxLength(255);
                entity.Property(u=>u.Password).IsRequired().HasMaxLength(5000);
                entity.Property(u=>u.IsStudent).IsRequired();
                entity.Property(u=>u.FirstName).HasMaxLength(255);
                entity.Property(u=>u.Surname).HasMaxLength(255);
                entity.Property(u=>u.Phone).HasMaxLength(255);
                entity.HasMany(u=>u.CourseList).WithOne(cl=>cl.User).HasForeignKey(cl=>cl.FKUserId).OnDelete(DeleteBehavior.Cascade);
            });
            _modelBuilder.Entity<UserCourseList>(entity=>{
                entity.HasKey(cl=>cl.Id);
                entity.HasMany(cl=>cl.CompletionList).WithOne(cc=>cc.UserCourseList).HasForeignKey(cc=>cc.FKListId).OnDelete(DeleteBehavior.Cascade);
            });
            _modelBuilder.Entity<UserCourseCompletion>(entity=>{
                entity.HasKey(cc=>cc.Id);
                entity.Property(cc=>cc.IsComplete).IsRequired();
            });
            base.OnModelCreating(_modelBuilder);
        }
        #endregion
    }
}
