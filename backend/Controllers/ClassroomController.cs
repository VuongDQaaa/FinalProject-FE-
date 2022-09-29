using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassroomController : ControllerBase
    {
        private IClassroomService _service;
        public ClassroomController(IClassroomService service)
        {
            _service = service;
        }

        [HttpGet("classrooms")]
        public async Task<List<Classroom>> GetAllClassroom()
        {
            return await _service.GetAllClassrooms();
        }
    }
}