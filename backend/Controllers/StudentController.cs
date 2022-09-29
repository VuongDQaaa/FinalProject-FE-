using backend.Interfaces;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using backend.Enums;
using backend.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private IStudentService _service;
        public StudentController(IStudentService service)
        {
            _service = service;
        }

        [Authorize(Role.Admin)]
        [HttpGet("students")]
        public async Task<List<Student>> GetAllStudent()
        {
            return await _service.GetAllStudents();
        }
    }
}