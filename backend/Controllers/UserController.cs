using Microsoft.AspNetCore.Mvc;
using backend.Interfaces;
using backend.Enums;
using backend.Models.Users;
using backend.Authorization;
using backend.Entities;
using backend.DTO;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IUserService _service;
        public UsersController(IUserService service, IUserService userService)
        {
            _service = service;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _service.Authenticate(model);
            return Ok(response);
        }

        [Authorize(Role.Admin)]
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [Authorize(Role.Admin)]
        [HttpGet("detail/{id:int}")]
        public IActionResult GetById(int id)
        {
            // only admins can access other user records
            var currentUser = (User)HttpContext.Items["User"];
            if (id != currentUser.UserId && currentUser.Role != Role.Admin)
                return Unauthorized(new { message = "Unauthorized" });

            var user = _userService.GetById(id);
            return Ok(user);
        }

        [Authorize(Role.Admin)]
        [HttpGet("GetAllActive")]
        public async Task<List<UserDTO>> GetAllActiveUser(int userId)
        {
            return await _service.GetAllActiveUser(userId);
        }

        [Authorize(Role.Admin)]
        [HttpPost("Add")]
        public async Task AddUser([FromBody]CreateUserModel user)
        {
            await _service.AddUser(user);
        }

        [Authorize(Role.Admin)]
        [HttpPut("Update/{userId}")]
        public async Task UpdateUser([FromBody]UpdateUserModel user, int userId)
        {
            await _service.UpdateUser(user, userId);
        }

        [Authorize(Role.Admin, Role.Teacher)]
        [HttpPut("First-login")]
        public async Task ChangePasswordFirstLogin(FirstLoginModel login)
        {
            await _service.ChangePasswordFirstLogin(login);
        }

        [Authorize(Role.Admin, Role.Teacher)]
        [HttpPut("Change-password")]
        public async Task ChangePassword(ChangePasswordModel changePassword)
        {
            await _service.ChangePassWord(changePassword);
        }

        [Authorize(Role.Admin)]
        [HttpPut("Disable/{userId}")]
        public async Task DiableUser(int userId)
        {
            await _service.DisableUser(userId);
        }

        [Authorize(Role.Admin)]
        [HttpDelete("Delete/{userId}")]
        public async Task DeleteUser(int userId)
        {
            await _service.DeleteUser(userId);
        }
    }
}