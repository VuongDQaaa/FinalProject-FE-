using System.ComponentModel.DataAnnotations;

namespace backend.Models.Students
{
    public class AuthenticateStudentRequest
    {
        [Required]
        public string? UserName { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}