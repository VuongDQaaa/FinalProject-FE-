using backend.Entities;

namespace WebApi.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Employee> WithoutPasswords(this IEnumerable<Employee> employees) 
        {
            if (employees == null) return null;

            return employees.Select(x => x.WithoutPassword());
        }

        public static Employee WithoutPassword(this Employee employee) 
        {
            if (employee == null) return null;

            employee.PasswordHash = null;
            return employee;
        }
    }
}