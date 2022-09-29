using backend.Entities;

namespace backend.Interfaces
{
    public interface IClassroomService
    {
        public Task<List<Classroom>> GetAllClassrooms();
    }
}