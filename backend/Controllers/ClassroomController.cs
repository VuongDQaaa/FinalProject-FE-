using backend.Models.Classrooms;
using backend.Entities;
using backend.Interfaces;
using backend.Authorization;
using backend.Enums;
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

        [Authorize(Role.Admin)]
        [HttpPost("New-classroom")]
        public async Task AddClassroom(UpdateClassroomModel classroomModel)
        {
            await _service.AddClassroom(classroomModel);
        }

        [Authorize(Role.Admin)]
        [HttpPut("Update-classroom/{classroomId}")]
        public async Task UpdateClassroom(UpdateClassroomModel classroomModel, int classroomId)
        {
            await _service.UpdateClassroom(classroomModel, classroomId);
        }

        [Authorize(Role.Admin)]
        [HttpDelete("Delete-classroom/{classroomId}")]
        public async Task DeleteClassroom(int classroomId)
        {
            await _service.DeleteClassroom(classroomId);
        }

        [Authorize(Role.Admin)]
        [HttpGet("All-classroom")]
        public async Task<List<Classroom>> GetAllClassroom()
        {
            return await _service.GetAllClassroom();
        }

        [Authorize(Role.Admin)]
        [HttpGet("detail/{classroomId}")]
        public async Task<Classroom> GetClassById(int classroomId)
        {
            return await _service.GetClassroomById(classroomId);
        }
    }
}