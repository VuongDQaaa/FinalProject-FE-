using backend.Models.Classrooms;
using backend.Entities;
using backend.Data;
using backend.Helpers;

namespace backend.Repositories
{

    public interface IClassroomRepository
    {
        public Task AddClassroom(UpdateClassroomModel classroomModel);
        public Task UpdateClassroom(UpdateClassroomModel classroomModel, int classroomId);
        public Task DeleteClassroom(int classroomId);
        public Task<List<Classroom>> GetAllClassroom();
        public Task<Classroom> GetClassroomById(int classroomId);
    }
    public class ClassroomRepository : IClassroomRepository
    {
        private MyDbContext _context;
        public ClassroomRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task AddClassroom(UpdateClassroomModel classroomModel)
        {
            try
            {
                var foundClassroom = _context.Classrooms.FirstOrDefault(a => a.ClassroomName == classroomModel.ClassroomName);
                if (foundClassroom == null)
                {
                    var newClassroom = new Classroom
                    {
                        ClassroomName = classroomModel.ClassroomName
                    };
                    await _context.Classrooms.AddAsync(newClassroom);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new AppException("This classroom have been created");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task UpdateClassroom(UpdateClassroomModel classroomModel, int classroomId)
        {
            try
            {
                var foundClassroom = await _context.Classrooms.FindAsync(classroomId);
                if (foundClassroom != null)
                {
                    var usedClassroomName = _context.Classrooms.FirstOrDefault(a => a.ClassroomName == classroomModel.ClassroomName);
                    if (usedClassroomName == null)
                    {
                        foundClassroom.ClassroomName = classroomModel.ClassroomName;
                        _context.Classrooms.Update(foundClassroom);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        throw new AppException("This name have been used");
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task DeleteClassroom(int classroomId)
        {
            try
            {
                var foundClassroom = await _context.Classrooms.FindAsync(classroomId);
                if (foundClassroom != null)
                {
                    _context.Classrooms.Remove(foundClassroom);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<Classroom>> GetAllClassroom()
        {
            return _context.Classrooms.ToList();
        }

        public async Task<Classroom> GetClassroomById(int classroomId)
        {
            var foundClassroom = await _context.Classrooms.FindAsync(classroomId);
            if (foundClassroom != null)
            {
                return foundClassroom;
            }
            else
            {
                throw new AppException("This class is not exist");
            }
        }
    }
}