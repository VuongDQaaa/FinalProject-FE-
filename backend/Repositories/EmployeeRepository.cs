using backend.Entities;
using backend.Data;

namespace backend.Repositories
{
    public interface IEmployeeRepository
    {
        public Task<List<Employee>> GetAllEmployees();
        public Task<Employee> GetEmployeeById(int id);
    }
    public class EmployeeRepository : IEmployeeRepository
    {
        private MyDbContext _context;
        public EmployeeRepository(MyDbContext context)
        {
            _context = context;
        }
        public async Task<List<Employee>> GetAllEmployees()
        {
            return _context.Employees.ToList();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var result = await _context.Employees.FindAsync(id);
            if(result != null)
            {
                return result;
            }
            return null;
        }
    }
}