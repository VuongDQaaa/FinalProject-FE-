using backend.Entities;
using backend.DTO;
using backend.Models.Students;

namespace backend.Interfaces
{
    public interface IStudentService
    {
        AuthenticateResponse Authenticate(AuthenticateStudentRequest model);
        public IEnumerable<Student> GetAll();
        public Student GetById(int id);
        public Task<List<StudentDTO>> GetAllActiveUser(int userId);
    }
}