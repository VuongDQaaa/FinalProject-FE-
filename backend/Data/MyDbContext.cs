using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class MyDbContext : DbContext
    {
        private readonly IConfiguration configuration;
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(e => e.ToTable("Employee"));
            modelBuilder.Entity<Student>(e => e.ToTable("Student"));
            modelBuilder.Entity<Classroom>(e => e.ToTable("Classroom"));

            modelBuilder.Entity<Student>()
            .HasOne(a => a.Classroom)
            .WithMany(b => b.Students)
            .HasForeignKey(c => c.ClassroomId);

            modelBuilder.Entity<Employee>().HasData(SeedingData.SeedingEmployees);
            modelBuilder.Entity<Student>().HasData(SeedingData.SeedingStudents);
            modelBuilder.Entity<Classroom>().HasData(SeedingData.SeedingClassrooms);
        }
    }
}