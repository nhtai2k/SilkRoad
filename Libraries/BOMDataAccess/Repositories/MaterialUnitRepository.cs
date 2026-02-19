using BOM.DAL.DTOs;
using BOM.DAL.IRepositories;

namespace BOM.DAL.Repositories
{
    public class MaterialUnitRepository : GenericRepository<MaterialUnitDTO>, IMaterialUnitRepository
    {
        public MaterialUnitRepository(ApplicationContext context) : base(context) { }
    }
}
