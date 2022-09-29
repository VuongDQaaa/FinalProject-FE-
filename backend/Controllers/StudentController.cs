using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("students")]
        public async Task<List<Student>> GetAllStudents()
        {
            return await _service.GetAllStudents();
        }
    }
}