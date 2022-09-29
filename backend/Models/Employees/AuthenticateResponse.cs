using backend.Entities;

namespace backend.Models.Employees
{
    public class AuthenticateResponse
    {
        public int EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
        public string IsFirstLogin { get; set; }
        public string Token { get; set; }
        public AuthenticateResponse(Employee employee, string token)
        {
            EmployeeId = employee.EmployeeId;
            EmployeeCode = employee.EmployeeCode;
            UserName = employee.UserName;
            FirstName = employee.FirstName;
            LastName = employee.LastName;
            Gender = employee.Gender.ToString();
            DateOfBirth = employee.DateOfBirth;
            PhoneNumber = employee.PhoneNumber;
            Role = employee.Role.ToString();
            IsFirstLogin = employee.IsFirstLogin.ToString();
            FullName = employee.FirstName + employee.LastName;
            Token = token;
        }

    }
}