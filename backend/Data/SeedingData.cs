using backend.Entities;
using backend.Enums;

namespace backend.Data
{
    public static class SeedingData
    {
        public static IEnumerable<Classroom> SeedingClassrooms
        {
            get
            {
                IEnumerable<Classroom> result = new List<Classroom>() {
                    new Classroom() {
                        ClassroomId = 1,
                        ClassroomName = "10 Sinh"
                    },
                    new Classroom() {
                        ClassroomId = 2,
                        ClassroomName = "10 Toan"
                    }
                };
                return result;
            }
        }
        public static IEnumerable<User> SeedingUsers
        {
            get
            {
                IEnumerable<User> result = new List<User>() {
                    new User() {
                        UserId = 1,
                        UserName = "Admin",
                        PasswordHash= BCrypt.Net.BCrypt.HashPassword("Admin"),
                        UserCode = "AD1",
                        FirstName="Dao",
                        LastName="Quy Vuong",
                        Gender = Gender.Male,
                        IsFirstLogin = false,
                        IsDiabled = false,
                        Role = Role.Admin,
                        DateOfBirth = new DateTime(2000,2,23),
                    },
                    new User() {
                        UserId = 2,
                        UserName = "Teacher",
                        PasswordHash= BCrypt.Net.BCrypt.HashPassword("Teacher"),
                        UserCode = "TC1",
                        FirstName="Do",
                        LastName="Duy Nam",
                        Gender = Gender.Male,
                        IsFirstLogin = false,
                        IsDiabled = false,
                        Role = Role.Teacher,
                        DateOfBirth = new DateTime(2000,2,23),
                    },
                };
                return result;
            }
        }
        public static IEnumerable<Student> SeedingStudents
        {
            get
            {
                IEnumerable<Student> result = new List<Student>(){
                    new Student() {
                        StudentId = 1,
                        UserName = "Student1",
                        PasswordHash= BCrypt.Net.BCrypt.HashPassword("Student"),
                        StudentCode = "ST1",
                        FirstName="Le",
                        LastName="Thi Van",
                        Gender = Gender.Female,
                        IsFirstLogin = false,
                        IsDiabled = false,
                        Role = Role.Student,
                        ClassroomName = "10 Sinh",
                        DateOfBirth = new DateTime(2000,2,23),
                        ClassroomId = 1
                    },
                        new Student() {
                        StudentId = 2,
                        UserName = "Student2",
                        PasswordHash= BCrypt.Net.BCrypt.HashPassword("Student"),
                        StudentCode = "ST2",
                        FirstName="Nguyen",
                        LastName="Van A",
                        Gender = Gender.Male,
                        IsFirstLogin = false,
                        IsDiabled = false,
                        Role = Role.Student,
                        ClassroomName = "10 Sinh",
                        DateOfBirth = new DateTime(2000,2,23),
                        ClassroomId = 1
                    },
                        new Student() {
                        StudentId = 3,
                        UserName = "Student3",
                        PasswordHash= BCrypt.Net.BCrypt.HashPassword("Student"),
                        StudentCode = "ST4",
                        FirstName="Nguyen",
                        LastName="Van B",
                        Gender = Gender.Male,
                        IsFirstLogin = false,
                        IsDiabled = false,
                        Role = Role.Student,
                        ClassroomName = "10 Toan",
                        DateOfBirth = new DateTime(2000,2,23),
                        ClassroomId = 2
                    },
                };
                return result;
            }
        }
    }
}