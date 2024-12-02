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
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<UserVideo> UserVideos { get; set; }

        #region Handlers
        protected override void OnModelCreating(ModelBuilder _modelBuilder)
        {
            _modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users"); // Define a tabela correspondente
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.Property(u => u.Password).IsRequired().HasMaxLength(5000);
                entity.Property(u => u.IsStudent).IsRequired();
                entity.Property(u => u.FirstName).HasMaxLength(255);
                entity.Property(u => u.Surname).HasMaxLength(255);
                entity.Property(u => u.Phone).HasMaxLength(255);
                entity.HasMany(u => u.CourseList)
                      .WithOne(uc => uc.User)
                      .HasForeignKey(uc => uc.FKUserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            _modelBuilder.Entity<UserCourse>(entity =>
            {
                entity.ToTable("UserCourses"); // Define a tabela correspondente
                entity.HasKey(uc => uc.Id);
                entity.Property(uc => uc.FKUserId).IsRequired();
                entity.HasMany(uc => uc.VideoList)
                      .WithOne(uv => uv.UserCourse)
                      .HasForeignKey(uv => uv.FKListId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            _modelBuilder.Entity<UserVideo>(entity =>
            {
                entity.ToTable("UserVideos"); // Define a tabela correspondente
                entity.HasKey(uv => uv.Id);
                entity.Property(uv => uv.IsWatched).IsRequired();
            });

            base.OnModelCreating(_modelBuilder);
        }

        #endregion
    }
}
