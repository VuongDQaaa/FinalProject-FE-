namespace backend.Models.Students
{
    public class StudentFirstLoginModel
    {
        public string UserName { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}