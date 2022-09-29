using backend.Entities;
using backend.Enums;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _service;
        public EmployeeController(IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet("employees")]
        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _service.GetAllEmployees();
        }

        [HttpGet("detail/{id:int}")]
        public IActionResult GetById(int id)
        {
            // only admins can access other user records
            var currentUser = (Employee)HttpContext.Items["Employee"];
            if (id != currentUser.EmployeeId && currentUser.Role != Role.Admin)
                return Unauthorized(new { message = "Unauthorized" });

            var user = _service.GetEmployeeById(id);
            return Ok(user);
        }
    }
}