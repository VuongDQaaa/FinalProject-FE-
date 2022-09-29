using backend.Entities;
using backend.Interfaces;
using backend.Repositories;

namespace backend.Services
{
    public class ClassroomService : IClassroomService
    {
        private IClassroomRepository _repository;
        public ClassroomService(IClassroomRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<Classroom>> GetAllClassrooms()
        {
            return await _repository.GetAllClassrooms();
        }
    }
}