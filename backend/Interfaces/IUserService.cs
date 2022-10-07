using backend.DTO;
using backend.Entities;
using backend.Models.Users;

namespace backend.Interfaces
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        public IEnumerable<User> GetAll();
        public User GetById(int id);
        public Task<List<UserDTO>> GetAllActiveUser(int userId);
        public Task AddUser(CreateUserModel user);
        public Task UpdateUser(UpdateUserModel user, int userId);
        public Task DeleteUser(int id);
        public Task DisableUser(int id);
        public Task ChangePasswordFirstLogin(ChangePasswordFirstLogin login);
        public Task ChangePassWord(ChangePasswordModel changePassword);
    }
}