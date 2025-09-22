using Microsoft.EntityFrameworkCore;
using RestaurantDataAccess.DTOs;
using RestaurantDataAccess.IRepositories;

namespace RestaurantDataAccess.Repositories
{
    public class DishRepository : GenericRepository<DishDTO>, IDishRepository
    {
        private DbSet<DishDTO> _dishes;

        public DishRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _dishes = dbContext.Set<DishDTO>();
        }
    }
}
