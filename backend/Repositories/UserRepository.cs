using backend.Data;
using backend.DTO;
using backend.Entities;
using backend.Enums;
using backend.Helpers;
using backend.Models.Users;
using backend.Utilities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        public Task AddUser(CreateUserModel user);
        public Task UpdateUser(UpdateUserModel user, int userId);
        public Task DeleteUser(int id);
        public Task DisableUser(int id);
        public Task ChangePasswordFirstLogin(ChangePasswordFirstLogin login);
        public Task ChangePassWord(ChangePasswordModel changePassword);
        public Task<List<UserDTO>> GetAllActiveUser(int userId);
        public Task<User> GetUserById(int id);
    }
    public class UserRepository : IUserRepository
    {
        private MyDbContext _context;

        public UserRepository(MyDbContext context)
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

        private string GenerateStaffCode(CreateUserModel userModel)
        {
            var userId = "";
            var lastUserId = _context.Users?.OrderByDescending(o => o.UserId).FirstOrDefault()?.UserId + 1;
            if(userModel.Role == "Admin")
            {
                userId = "AD" + String.Format("{0,0:D4}", lastUserId++);
            }
            if(userModel.Role == "Teacher")
            {
                userId = "TC" + String.Format("{0,0:D4}", lastUserId++);
            }
            return userId;
        }

        private string GeneratePassword(string username)
        {
            return username + "@123456";
        }

        public async Task<User> GetUserById(int id)
        {
            var foundUser = await _context.Users.FindAsync(id);
            if (foundUser != null)
            {
                return foundUser;
            }
            return null;
        }

        public async Task<List<UserDTO>> GetAllActiveUser(int userId)
        {
            var item = _context.Users.FirstOrDefault(x => x.UserId == userId);
            if (item != null)
            {
                var users = _context.Users.Where(x => x.IsDiabled == false);
                if (users != null)
                {
                    return await users.Select(x => x.UserEntityToDTO()).ToListAsync();
                }
                return null;
            }
            else
            {
                return null;
            }
        }

        public async Task AddUser(CreateUserModel user)
        {
            var username = GenerateUserName(user.FirstName, user.LastName);
            DateTime dateTimeParseResult;
            try
            {
                if (!CheckDateOfBirth(user.DateOfBirth))
                {
                    throw new AppException("Date of birth is in the future");
                }
                if (DateTime.Now.Year - user.DateOfBirth.Year < 18)
                {
                    throw new AppException("User is under 18. Please select a different date");
                }
                var newUser = new User
                {
                    UserName = username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(GeneratePassword(username)),
                    UserCode = GenerateStaffCode(user),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = !user.Gender.Equals("Male") ? Gender.Female : Gender.Male,
                    IsFirstLogin = true,
                    IsDiabled = false,
                    Role = !user.Role.Equals("Teacher") ? Role.Admin : Role.Teacher,
                    DateOfBirth = user.DateOfBirth
                };
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task UpdateUser(UpdateUserModel user, int userId)
        {
            try
            {
                if (!CheckDateOfBirth(user.DateOfBirth))
                {
                    throw new AppException("Date of birth is in the future");
                }
                if (DateTime.Now.Year - user.DateOfBirth.Year < 18)
                {
                    throw new AppException("User is under 18. Please select a different date");
                }
                var foundUser = await _context.Users.FindAsync(userId);
                if(foundUser != null)
                {
                    foundUser.FirstName = user.FirstName;
                    foundUser.LastName = user.LastName;
                    foundUser.DateOfBirth = user.DateOfBirth;
                    foundUser.Gender = !user.Gender.Equals("Male") ? Gender.Female : Gender.Male;
                    foundUser.Role = !user.Role.Equals("Admin") ? Role.Teacher : Role.Admin;

                    _context.Users.Update(foundUser);
                    await _context.SaveChangesAsync();
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task DeleteUser(int id)
        {
            try
            {
                var foundUser = await _context.Users.FindAsync(id);
                if (foundUser != null)
                {
                    _context.Users.Remove(foundUser);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task DisableUser(int id)
        {
            try
            {
                var foundUser = await _context.Users.FindAsync(id);
                if(foundUser != null)
                {
                    foundUser.IsDiabled = false;
                    _context.Update(foundUser);
                    await _context.SaveChangesAsync();
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task ChangePasswordFirstLogin(ChangePasswordFirstLogin login)
        {
            try
            {
                var foundUser = _context.Users.FirstOrDefault(x => x.UserName == login.UserName);
                if (BCrypt.Net.BCrypt.Verify(login.NewPassword, foundUser.PasswordHash)) throw new AppException("New password has to be different from old password");
                if (login.NewPassword.Length > 255) throw new AppException("Your password should less than 255 chatacters");
                if (login.NewPassword.Length < 8) throw new AppException("Your password should more than 8 chatacters");
                if (!checkValidPassowrd(login.NewPassword)) throw new AppException("Password should not have any space");
                if (foundUser.IsFirstLogin == false) throw new AppException("This is not your first login");
                if (foundUser != null

                    && login.NewPassword.Length > 8
                    && login.NewPassword.Length < 255)
                {
                    foundUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(login.NewPassword);
                    foundUser.IsFirstLogin = false;

                    _context.Users.Update(foundUser);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task ChangePassWord(ChangePasswordModel changePassword)
        {
            try
            {
                var foundUser = _context.Users.FirstOrDefault(user => user.UserName == changePassword.UserName);
                if (!BCrypt.Net.BCrypt.Verify(changePassword.OldPassword, foundUser.PasswordHash)) throw new AppException("Wrong old password");
                if (changePassword.OldPassword == changePassword.NewPassword) throw new AppException("New password has to be different from old password");
                if (changePassword.NewPassword.Length > 255) throw new AppException("Password should less than 255 characters");
                if (changePassword.NewPassword.Length < 8) throw new AppException("Password should have more than 8 characters");
                if (!checkValidPassowrd(changePassword.NewPassword)) throw new AppException("Password should not have any space");
                if (foundUser != null)
                {
                    foundUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(changePassword.NewPassword);

                    _context.Users.Update(foundUser);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}