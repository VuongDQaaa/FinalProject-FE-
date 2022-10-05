using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class StudentDTO
    {
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public string? StudentCode { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? IsFirstLogin { get; set; }
        public string? IsDiabled { get; set; }
        public string? className { get; set; }
        public string? Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? FullName { get; set; }
    }
}