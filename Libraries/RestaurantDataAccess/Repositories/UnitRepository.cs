using Restaurant.DAL.DTOs;
using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL.Repositories
{
    public class UnitRepository : GenericRepository<UnitDTO>, IUnitRepository
    {
        public UnitRepository(ApplicationContext context) : base(context) { }

    }
}
