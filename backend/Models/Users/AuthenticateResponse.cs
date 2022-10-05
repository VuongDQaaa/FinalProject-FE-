using backend.Entities;

namespace backend.Models.Users
{
    public class AuthenticateResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string IsFirstLogin { get; set; }
        public string IsDiabled { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }
        public AuthenticateResponse(User user, string token)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Gender = user.Gender.ToString();
            IsFirstLogin = user.IsFirstLogin.ToString();
            IsDiabled = user.IsDiabled.ToString();
            Role = user.Role.ToString();
            DateOfBirth = user.DateOfBirth;
            FullName = user.FullName;
            Token = token;
        }
    }
}