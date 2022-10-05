using backend.Authorization;
using backend.Helpers;
using backend.Interfaces;
using backend.Repositories;
using backend.Models.Students;
using Microsoft.Extensions.Options;
using backend.Data;
using backend.Entities;
using backend.DTO;

namespace backend.Services
{
    public class StudentService : IStudentService
    {
        private IStudentRepository _repository;
        private MyDbContext _context;
        private IJwtUtils _jwtUtilsStudent;
        private readonly AppSettings _appSettings;
        public StudentService(
            MyDbContext context,
            IStudentRepository repository,
            IJwtUtils jwtUtilsStudent,
            IOptions<AppSettings> appSettings)
        {
            _context = context;
            _repository = repository;
            _jwtUtilsStudent = jwtUtilsStudent;
            _appSettings = appSettings.Value;
        }
        public Models.Students.AuthenticateResponse Authenticate(Models.Students.AuthenticateStudentRequest model)
        {
            var student = _context.Students.SingleOrDefault(x => x.UserName == model.UserName);
            // validate
            if (student == null || !BCrypt.Net.BCrypt.Verify(model.Password, student.PasswordHash))
                throw new AppException("Username or password is incorrect. Please try again");
            // When account have been disable    
            if (student.IsDiabled == true) throw new AppException("This account has been disabled");
            // authentication successful so generate jwt token
            var jwtToken = _jwtUtilsStudent.GenerateStudentJwtToken(student);

            return new AuthenticateResponse(student, jwtToken);
        }

        public IEnumerable<Student> GetAll()
        {
            return _context.Students;
        }

        public async Task<List<StudentDTO>> GetAllActiveUser(int userId)
        {
            return await _repository.GetAllActiveStudent(userId);
        }

        public Student GetById(int id)
        {
            var student = _context.Students.Find(id);
            return student;
        }
    }
}