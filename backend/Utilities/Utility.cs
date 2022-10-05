using backend.DTO;
using backend.Entities;
using backend.Enums;

namespace backend.Utilities
{
    public static class Utility
    {
        public static UserDTO UserEntityToDTO(this User entity)
        {
            UserDTO result = new UserDTO
            {
                UserName = entity.UserName,
                PasswordHash = entity.PasswordHash,
                UserCode = entity.UserCode,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Gender = entity.Gender.ToString(),
                IsFirstLogin = entity.IsFirstLogin.ToString(),
                IsDiabled = entity.IsDiabled.ToString(),
                Role = entity.Role.ToString(),
                DateOfBirth = entity.DateOfBirth,
                FullName = entity.FullName
            };
            return result;
        }
        public static StudentDTO StudentEntityToDTO(this Student entity)
        {
            StudentDTO result = new StudentDTO
            {
                UserName = entity.UserName,
                PasswordHash = entity.PasswordHash,
                StudentCode = entity.StudentCode,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Gender = entity.Gender.ToString(),
                IsFirstLogin = entity.IsFirstLogin.ToString(),
                IsDiabled = entity.IsDiabled.ToString(),
                Role = entity.Role.ToString(),
                DateOfBirth = entity.DateOfBirth,
                FullName = entity.FullName
            };
            return result;
        }
    }
}