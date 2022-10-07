namespace backend.Models.Students
{
    public class CreateStudentModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ClassroomName { get; set; }
    }
}