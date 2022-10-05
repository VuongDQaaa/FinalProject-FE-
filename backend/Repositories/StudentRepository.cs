using backend.Data;
using backend.DTO;
using backend.Entities;
using backend.Utilities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IStudentRepository
    {
        public Task<List<StudentDTO>> GetAllActiveStudent(int studentId);
        public Task<Student> GetStudentById(int id);
    }
    public class StudentRepository : IStudentRepository
    {
        private MyDbContext _context;
        public StudentRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<StudentDTO>> GetAllActiveStudent(int studentId)
        {
            var item = _context.Students.FirstOrDefault(x => x.StudentId == studentId);
            if (item != null)
            {
                var students = _context.Students.Where(x => x.IsDiabled == false);
                if (students != null)
                {
                    return await students.Select(x => x.StudentEntityToDTO()).ToListAsync();
                }
                return null;
            }
            else
            {
                return null;
            }
        }

        public async Task<Student> GetStudentById(int id)
        {
            var foundStudent = await _context.Students.FindAsync(id);
            if (foundStudent != null)
            {
                return foundStudent;
            }
            return null;
        }
    }
}