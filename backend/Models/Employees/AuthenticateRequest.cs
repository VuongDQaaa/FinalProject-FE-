using System.ComponentModel.DataAnnotations;

namespace backend.Models.Employees
{
    public class AuthenticateRequest
    {
        [Required]
        public string? UserName { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}