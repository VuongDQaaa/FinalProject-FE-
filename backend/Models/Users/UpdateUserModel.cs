namespace backend.Models.Users
{
    public class UpdateUserModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Role { get; set; }
    }
}