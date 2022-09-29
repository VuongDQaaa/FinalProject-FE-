using backend.Data;
using backend.Entities;

namespace backend.Repositories
{
    public interface IClassroomRepository
    {
        public Task<List<Classroom>> GetAllClassrooms();
    }
    public class ClassroomRepository : IClassroomRepository
    {
        private MyDbContext _context;
        public ClassroomRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Classroom>> GetAllClassrooms()
        {
            return _context.Classrooms.ToList();
        }
    }
}