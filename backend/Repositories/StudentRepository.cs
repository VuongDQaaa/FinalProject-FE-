using backend.Entities;
using backend.Data;

namespace backend.Repositories
{
    public interface IStudentRepository
    {
        public Task<List<Student>> GetAllStudent();
    }
    public class StudentRepository : IStudentRepository
    {
        private MyDbContext _context;
        public StudentRepository(MyDbContext context)
        {
            _context = context;
        }
        public async Task<List<Student>> GetAllStudent()
        {
            return _context.Students.ToList();
        }
    }
}