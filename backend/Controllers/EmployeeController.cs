using backend.Interfaces;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using backend.Authorization;
using backend.Models.Employees;
using backend.Enums;

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

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _service.Authenticate(model);
            return Ok(response);
        }

        [Authorize(Role.Admin)]
        [HttpGet("employees")]
        public async Task<List<Employee>> GetAllEmployee()
        {
            return await _service.GetAllEmployees();
        }
        
        [HttpGet("detail/{id:int}")]
        public IActionResult GetEmployeeById(int id)
        {
            var user = _service.GetEmployeeById(id);
            return Ok(user);
        }
    }
}