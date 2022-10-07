using backend.Authorization;
using backend.Helpers;
using backend.Interfaces;
using backend.Repositories;
using backend.Models.Users;
using Microsoft.Extensions.Options;
using backend.Data;
using backend.Entities;
using backend.DTO;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _repository;
        private MyDbContext _context;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;
        public UserService(
            MyDbContext context,
            IUserRepository repository,
            IJwtUtils jwtUtils,
            IOptions<AppSettings> appSettings)
        {
            _context = context;
            _repository = repository;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            var user = _context.Users.Find(id);
            return user;
        }
        
        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.UserName == model.UserName);
            // validate
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                throw new AppException("Username or password is incorrect. Please try again");
            // When account have been disable    
            if (user.IsDiabled == true) throw new AppException("This account has been disabled");
            // authentication successful so generate jwt token
            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponse(user, jwtToken);
        }

        public async Task<List<UserDTO>> GetAllActiveUser(int userId)
        {
            return await _repository.GetAllActiveUser(userId);
        }

        public async Task AddUser(CreateUserModel user)
        {
            await _repository.AddUser(user);
        }

        public async Task UpdateUser(UpdateUserModel user, int userId)
        {
            await _repository.UpdateUser(user, userId);
        }

        public async Task DeleteUser(int id)
        {
            await _repository.DeleteUser(id);
        }

        public async Task DisableUser(int id)
        {
            await _repository.DisableUser(id);
        }

        public async Task ChangePasswordFirstLogin(FirstLoginModel login)
        {
            await _repository.ChangePasswordFirstLogin(login);
        }

        public async Task ChangePassWord(ChangePasswordModel changePassword)
        {
            await _repository.ChangePassWord(changePassword);
        }
    }
}