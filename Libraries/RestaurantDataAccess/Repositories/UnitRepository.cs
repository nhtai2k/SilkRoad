using RestaurantDataAccess.DTOs;
using RestaurantDataAccess.IRepositories;

namespace RestaurantDataAccess.Repositories
{
    public class UnitRepository : GenericRepository<UnitDTO>, IUnitRepository
    {
        public UnitRepository(ApplicationContext context) : base(context) { }

    }
}
