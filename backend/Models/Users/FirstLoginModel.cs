namespace backend.Models.Users
{
    public class FirstLoginModel
    {
        public string UserName { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}