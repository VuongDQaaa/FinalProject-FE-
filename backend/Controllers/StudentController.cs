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
        [HttpPost("[action]")]
        public IActionResult Authenticate(AuthenticateStudentRequest model)
        {
            var response = _service.Authenticate(model);
            return Ok(response);
        }

        [AuthorizeAttributeStudent(Role.Student)]
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var users = _studentService.GetAll();
            return Ok(users);
        }

        [AuthorizeAttributeStudent(Role.Student)]
        [HttpGet("detail/{id:int}")]
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
        [HttpGet("GetAllActive")]
        public async Task<List<StudentDTO>> GetAllActiveStudent(int userId)
        {
            return await _service.GetAllActiveUser(userId);
        }
        
    }
}