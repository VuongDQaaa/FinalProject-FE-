using backend.Interfaces;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using backend.Enums;
using backend.Authorization;

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

        [Authorize(Role.Admin)]
        [HttpGet("classrooms")]
        public async Task<List<Classroom>> GetAllClassrooms()
        {
            return await _service.GetAllClassrooms();
        }
    }
}