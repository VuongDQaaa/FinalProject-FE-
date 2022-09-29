using backend.Entities;
using backend.Interfaces;
using backend.Repositories;

namespace backend.Services
{
    public class StudentService : IStudentService
    {
        private IStudentRepository _repository;
        public StudentService(IStudentRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<Student>> GetAllStudents()
        {
            return await _repository.GetAllStudent();
        }
    }
}