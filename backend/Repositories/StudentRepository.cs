using backend.Data;
using backend.DTO;
using backend.Entities;
using backend.Utilities;
using backend.Models.Students;
using Microsoft.EntityFrameworkCore;
using backend.Helpers;
using backend.Enums;

namespace backend.Repositories
{
    public interface IStudentRepository
    {
        public Task AddStudent(CreateStudentModel studentModel);
        public Task UpdateStudent(UpdateStudentModel studentModel, int studentId);
        public Task DeleteStudent(int id);
        public Task DisableStudent(int id);
        public Task ChangePasswordFirstLogin(StudentFirstLoginModel login);
        public Task ChangePassWord(UpdatePasswordModel changePassword);
        public Task<List<StudentDTO>> GetAllActiveStudent(int studentId);
        public Task<Student> GetStudentById(int id);
    }
    public class StudentRepository : IStudentRepository
    {
        private MyDbContext _context;
        public StudentRepository(MyDbContext context)
        {
            _context = context;
        }

        private bool checkValidPassowrd(string password)
        {
            int countSpace = 0;
            string str1;
            for (int i = 0; i < password.Length; i++)
            {
                str1 = password.Substring(i, 1);
                if (str1 == " ")
                    countSpace++;
            }

            if (countSpace > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private bool CheckDateOfBirth(DateTime date)
        {
            if (DateTime.Compare(DateTime.Now, date) < 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private string GenerateUserName(string? firstname, string? lastname)
        {
            var prefix = "";
            var postfix = "";
            if (lastname == null)
            {
                prefix = "";
            }
            else
            {
                var lastnames = lastname.Trim().Split(' ');
                foreach (var fn in lastnames)
                {
                    prefix += fn.Trim();
                }
            }

            if (firstname == null)
            {
                postfix = "";
            }
            else
            {
                var firstnames = firstname.Trim().Split(' ');
                foreach (var ln in firstnames)
                {
                    if (ln != "") postfix += ln.Trim().Substring(0, 1);
                }
            }

            var rawusername = (prefix + postfix).ToLower();

            //generate code
            var checkInUserTable = _context.Users.Any(o => o.UserName.Equals(rawusername));
            var checkInStudentTable = _context.Students.Any(o => o.UserName.Equals(rawusername));
            if (checkInUserTable && checkInStudentTable)
            {
                var postNumber = 0;
                var flag = true;
                var username = "";
                do
                {
                    postNumber++;
                    username = rawusername + postNumber.ToString();
                    flag = CheckUsernameDb(username);
                } while (flag);
                return username;
            }
            else
            {
                return rawusername;
            }
        }

        private bool CheckUsernameDb(string username)
        {
            var checkInUserTable = _context.Users.Any(o => o.UserName.Equals(username));
            var checkInStudentTable = _context.Students.Any(o => o.UserName.Equals(username));
            if (checkInUserTable && checkInStudentTable)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private string GenerateStudentCode(CreateStudentModel userModel)
        {
            var studentGen = DateTime.Now.Year - 2002;
            var lastUserId = _context.Users?.OrderByDescending(o => o.UserId).FirstOrDefault()?.UserId + 1;
            var userId = "ST" + studentGen + String.Format("{0,0:D4}", lastUserId++);
            return userId;
        }

        private string GeneratePassword(string username)
        {
            return username + "@123456";
        }

        public async Task AddStudent(CreateStudentModel studentModel)
        {
            var username = GenerateUserName(studentModel.FirstName, studentModel.LastName);
            DateTime dateTimeParseResult;
            try
            {
                if (!CheckDateOfBirth(studentModel.DateOfBirth))
                {
                    throw new AppException("Date of birth is in the future");
                }
                var foudedClassroom = _context.Classrooms.Find(studentModel.ClassroomName);
                if (foudedClassroom != null)
                {
                    var newStudent = new Student
                    {
                        UserName = username,
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword(GeneratePassword(username)),
                        StudentCode = GenerateStudentCode(studentModel),
                        FirstName = studentModel.FirstName,
                        LastName = studentModel.LastName,
                        Gender = !studentModel.Gender.Equals("Male") ? Gender.Female : Gender.Male,
                        IsFirstLogin = true,
                        IsDiabled = false,
                        Role = Role.Student,
                        DateOfBirth = studentModel.DateOfBirth,
                        ClassroomName = studentModel.ClassroomName,
                        ClassroomId = foudedClassroom.ClassroomId
                    };
                    await _context.Students.AddAsync(newStudent);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task ChangePassWord(UpdatePasswordModel changePassword)
        {
            try
            {
                var foundStudent = _context.Students.FirstOrDefault(user => user.UserName == changePassword.UserName);
                if (!BCrypt.Net.BCrypt.Verify(changePassword.OldPassword, foundStudent.PasswordHash)) throw new AppException("Wrong old password");
                if (changePassword.OldPassword == changePassword.NewPassword) throw new AppException("New password has to be different from old password");
                if (changePassword.NewPassword.Length > 255) throw new AppException("Password should less than 255 characters");
                if (changePassword.NewPassword.Length < 8) throw new AppException("Password should have more than 8 characters");
                if (!checkValidPassowrd(changePassword.NewPassword)) throw new AppException("Password should not have any space");
                if (changePassword.NewPassword != changePassword.ConfirmPassword) throw new AppException("Confirm password is wrong");
                if (foundStudent != null)
                {
                    foundStudent.PasswordHash = BCrypt.Net.BCrypt.HashPassword(changePassword.NewPassword);

                    _context.Students.Update(foundStudent);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task ChangePasswordFirstLogin(StudentFirstLoginModel login)
        {
            try
            {
                var foundStudent = _context.Students.FirstOrDefault(x => x.UserName == login.UserName);
                if (BCrypt.Net.BCrypt.Verify(login.NewPassword, foundStudent.PasswordHash)) throw new AppException("New password has to be different from old password");
                if (login.NewPassword.Length > 255) throw new AppException("Your password should less than 255 chatacters");
                if (login.NewPassword.Length < 8) throw new AppException("Your password should more than 8 chatacters");
                if (!checkValidPassowrd(login.NewPassword)) throw new AppException("Password should not have any space");
                if (login.NewPassword != login.ConfirmPassword) throw new AppException("Confirm password is wrong");
                if (foundStudent.IsFirstLogin == false) throw new AppException("This is not your first login");
                if (foundStudent != null

                    && login.NewPassword.Length > 8
                    && login.NewPassword.Length < 255)
                {
                    foundStudent.PasswordHash = BCrypt.Net.BCrypt.HashPassword(login.NewPassword);
                    foundStudent.IsFirstLogin = false;

                    _context.Students.Update(foundStudent);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task DeleteStudent(int id)
        {
            try
            {
                var foundStudent = await _context.Students.FindAsync(id);
                if (foundStudent != null)
                {
                    _context.Students.Remove(foundStudent);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task DisableStudent(int id)
        {
            try
            {
                var foundStudent = await _context.Students.FindAsync(id);
                if (foundStudent != null)
                {
                    foundStudent.IsDiabled = true;
                    _context.Students.Update(foundStudent);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<StudentDTO>> GetAllActiveStudent(int studentId)
        {
            var item = _context.Students.FirstOrDefault(x => x.StudentId == studentId);
            if (item != null)
            {
                var students = _context.Students.Where(x => x.IsDiabled == false);
                if (students != null)
                {
                    return await students.Select(x => x.StudentEntityToDTO()).ToListAsync();
                }
                return null;
            }
            else
            {
                return null;
            }
        }

        public async Task<Student> GetStudentById(int id)
        {
            var foundStudent = await _context.Students.FindAsync(id);
            if (foundStudent != null)
            {
                return foundStudent;
            }
            return null;
        }

        public async Task UpdateStudent(UpdateStudentModel studentModel, int studentId)
        {
            try
            {
                if (!CheckDateOfBirth(studentModel.DateOfBirth))
                {
                    throw new AppException("Date of birth is in the future");
                }
                var foundStudent = await _context.Students.FindAsync(studentId);
                var foundClassroom = await _context.Classrooms.FindAsync(studentModel.ClassroomName);
                if (foundStudent != null && foundClassroom != null)
                {
                    foundStudent.FirstName = studentModel.FirstName;
                    foundStudent.LastName = studentModel.LastName;
                    foundStudent.DateOfBirth = studentModel.DateOfBirth;
                    foundStudent.Gender = !studentModel.Gender.Equals("Male") ? Gender.Female : Gender.Male;
                    foundStudent.ClassroomName = studentModel.ClassroomName;
                    foundStudent.ClassroomId = foundClassroom.ClassroomId;

                    _context.Students.Update(foundStudent);
                    await _context.SaveChangesAsync();
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}