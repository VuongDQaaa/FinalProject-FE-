using backend.Entities;
using backend.Models.Employees;

namespace backend.Interfaces
{
    public interface IEmployeeService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        public Task<List<Employee>> GetAllEmployees();
        public Task<Employee> GetEmployeeById(int id);
    }
}