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
        public static IEnumerable<Employee> SeedingEmployees
        {
            get
            {
                IEnumerable<Employee> result = new List<Employee>() {
                    new Employee() {
                        EmployeeId = 1,
                        UserName = "Staff1",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Nguyen",
                        LastName = "Van Quyet",
                        Gender = Gender.Male,
                        DateOfBirth = DateTime.Now,
                        PhoneNumber = "0335878777",
                        Role = Role.Admin,
                        IsFirstLogin = true
                    },
                    new Employee() {
                        EmployeeId = 2,
                        UserName = "Staff2",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Do",
                        LastName = "Thi Van",
                        Gender = Gender.Female,
                        DateOfBirth = DateTime.Now,
                        PhoneNumber = "1900561252",
                        Role = Role.Admin,
                        IsFirstLogin = true
                    },
                    new Employee() {
                        EmployeeId = 3,
                        UserName = "Staff3",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Dinh",
                        LastName = "Quoc Vuong",
                        Gender = Gender.Male,
                        DateOfBirth = DateTime.Now,
                        PhoneNumber = "0335689232",
                        Role = Role.Teacher,
                        IsFirstLogin = true
                    },
                        new Employee() {
                        EmployeeId = 4,
                        UserName = "Staff4",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Le",
                        LastName = "Anh Vien",
                        Gender = Gender.Female,
                        DateOfBirth = DateTime.Now,
                        PhoneNumber = "0983287143",
                        Role = Role.Teacher,
                        IsFirstLogin = true
                    },
                };
                return result;
            }
        }
        public static IEnumerable<Student> SeedingStudents
        {
            get
            {
                IEnumerable<Student> result = new List<Student>
                {
                    new Student() {
                        StudentId = 1,
                        UserName = "Student1",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Le",
                        LastName = "Van Luyen",
                        Gender = Gender.Male,
                        DateOfBirth = DateTime.Now,
                        ClassroomId = 1,
                        ClassroomName = "10 Sinh",
                        IsFirstLogin = true
                    },
                        new Student() {
                        StudentId = 2,
                        UserName = "Student2",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Anna",
                        LastName = "Viet Nam",
                        Gender = Gender.Female,
                        DateOfBirth = DateTime.Now,
                        ClassroomId = 1,
                        ClassroomName = "10 Toan",
                        IsFirstLogin = true
                    },
                        new Student() {
                        StudentId = 3,
                        UserName = "Student3",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                        FirstName = "Dao",
                        LastName = "Quy Vuong",
                        Gender = Gender.Male,
                        DateOfBirth = DateTime.Now,
                        ClassroomId = 2,
                        ClassroomName = "10 Toan",
                        IsFirstLogin = true
                    }
                };
                return result;
            }
        }
    }
}