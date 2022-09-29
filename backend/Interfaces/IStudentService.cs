using backend.Entities;

namespace backend.Interfaces
{
    public interface IStudentService
    {
        public Task<List<Student>> GetAllStudents();
    }
}