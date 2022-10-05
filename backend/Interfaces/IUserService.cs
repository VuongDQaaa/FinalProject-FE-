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
    }
}