using backend.Models.Classrooms;
using backend.Entities;

namespace backend.Interfaces
{
    public interface IClassroomService
    {
        public Task AddClassroom(UpdateClassroomModel classroomModel);
        public Task UpdateClassroom(UpdateClassroomModel classroomModel, int classroomId);
        public Task DeleteClassroom(int classroomId);
        public Task<List<Classroom>> GetAllClassroom();
        public Task<Classroom> GetClassroomById(int classroomId);
    }
}