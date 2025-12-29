using BOMDataAccess.DTOs;
using BOMDataAccess.IRepositories;

namespace BOMDataAccess.Repositories
{
    public class MaterialUnitRepository : GenericRepository<MaterialUnitDTO>, IMaterialUnitRepository
    {
        public MaterialUnitRepository(ApplicationContext context) : base(context) { }
    }
}
