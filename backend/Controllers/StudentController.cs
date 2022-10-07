using Microsoft.AspNetCore.Mvc;
using backend.Interfaces;
using backend.Enums;
using backend.Models.Students;
using backend.Authorization;
using backend.Entities;
using backend.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private IStudentService _studentService;
        private IStudentService _service;
        public StudentController(IStudentService service, IStudentService studentService)
        {
            _service = service;
            _studentService = studentService;
        }

        [AllowAnonymousAttribute]
        [HttpPost("student/[action]")]
        public IActionResult Authenticate(AuthenticateStudentRequest model)
        {
            var response = _service.Authenticate(model);
            return Ok(response);
        }

        [AuthorizeAttributeStudent(Role.Student)]
        [HttpGet("all-student")]
        public IActionResult GetAll()
        {
            var users = _studentService.GetAll();
            return Ok(users);
        }

        [AuthorizeAttributeStudent(Role.Student)]
        [HttpGet("detail-student/{id:int}")]
        public IActionResult GetById(int id)
        {
            // only students can access other user records
            var currentUser = (Student)HttpContext.Items["Student"];
            if (id != currentUser.StudentId && currentUser.Role != Role.Student)
                return Unauthorized(new { message = "Unauthorized" });

            var user = _studentService.GetById(id);
            return Ok(user);
        }

        [Authorize(Role.Student)]
        [HttpGet("GetAllActiveStudent")]
        public async Task<List<StudentDTO>> GetAllActiveStudent(int userId)
        {
            return await _service.GetAllActiveStudent(userId);
        }

        [HttpPost("Add")]
        public async Task AddStudent([FromBody]CreateStudentModel studentModel)
        {
            await _service.AddStudent(studentModel);
        }

        [HttpPut("Update/{studentId}")]
        public async Task UpdateStudent([FromBody]UpdateStudentModel studentModel, int studentId)
        {
            await _service.UpdateStudent(studentModel, studentId);
        }

        [HttpPut("Change-password-student")]
        public async Task ChangePassword(UpdatePasswordModel changePassword)
        {
            await _service.ChangePassWord(changePassword);
        }

        [HttpPut("First-login-student")]
        public async Task ChangePasswordFirstLogin(StudentFirstLoginModel login)
        {
            await _service.ChangePasswordFirstLogin(login);
        }

        [HttpPut("Diable/{studentId}")]
        public async Task DisableStudent(int studentId)
        {
            await _service.DisableStudent(studentId);
        }

        [HttpDelete("Delete/{studentId}")]
        public async Task DeleteStudent(int studentId)
        {
            await _service.DeleteStudent(studentId);
        }
        
    }
}