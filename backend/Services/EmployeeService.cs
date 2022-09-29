using backend.Authorization;
using backend.Entities;
using backend.Interfaces;
using backend.Data;
using backend.Models.Employees;
using backend.Repositories;
using backend.Helpers;
using Microsoft.Extensions.Options;

namespace backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IEmployeeRepository _repository;
        private MyDbContext _context;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        public EmployeeService(
            IEmployeeRepository repository, 
            MyDbContext context,
            IJwtUtils jwtUtils,
            IOptions<AppSettings> appSettings)
        {
            _repository = repository;
            _context = context;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value; 
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Employees.SingleOrDefault(x => x.UserName == model.UserName);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                throw new AppException("Username or password is incorrect. Please try again");

            // authentication successful so generate jwt token
            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponse(user, jwtToken);
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _repository.GetAllEmployees();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _repository.GetEmployeeById(id);
        }
    }
}