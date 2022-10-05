using backend.Data;
using backend.DTO;
using backend.Entities;
using backend.Utilities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IUserRepository
    {
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
    }
}