using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class MyDbContext : DbContext
    {
        private readonly IConfiguration configuration;
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Student> Students {get;set;}
        public DbSet<Classroom> Classrooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e => e.ToTable("User"));
            modelBuilder.Entity<Classroom>(e => e.ToTable("Classroom"));

            //User
            modelBuilder.Entity<Student>()
            .HasOne(a => a.Classroom)
            .WithMany(b => b.Students)
            .HasForeignKey(c => c.ClassroomId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

            //Seeding data
            modelBuilder.Entity<User>().HasData(SeedingData.SeedingUsers);
            modelBuilder.Entity<Student>().HasData(SeedingData.SeedingStudents);
            modelBuilder.Entity<Classroom>().HasData(SeedingData.SeedingClassrooms);
        }
    }
}