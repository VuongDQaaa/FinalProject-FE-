using backend.Entities;
using backend.Interfaces;
using backend.Models.Classrooms;
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

        public async Task AddClassroom(UpdateClassroomModel classroomModel)
        {
            await _repository.AddClassroom(classroomModel);
        }

        public async Task DeleteClassroom(int classroomId)
        {
            await _repository.DeleteClassroom(classroomId);
        }

        public async Task<List<Classroom>> GetAllClassroom()
        {
            return await _repository.GetAllClassroom();
        }

        public async Task<Classroom> GetClassroomById(int classroomId)
        {
            return await _repository.GetClassroomById(classroomId);
        }

        public async Task UpdateClassroom(UpdateClassroomModel classroomModel, int classroomId)
        {
            await _repository.UpdateClassroom(classroomModel, classroomId);
        }
    }
}