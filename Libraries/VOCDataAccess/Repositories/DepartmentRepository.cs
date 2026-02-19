using VOC.DAL.DTOs;
using VOC.DAL.IRepositories;

namespace VOC.DAL.Repositories
{
    public class DepartmentRepository : GenericRepository<DepartmentDTO, ApplicationContext>, IDepartmentRepository
    {
        public DepartmentRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
