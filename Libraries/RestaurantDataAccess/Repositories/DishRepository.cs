using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.DTOs;
using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL.Repositories
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
