using Microsoft.EntityFrameworkCore;
using RestaurantDataAccess.DTOs;
using RestaurantDataAccess.IRepositories;

namespace RestaurantDataAccess.Repositories
{
    public class TableRepository : GenericRepository<TableDTO>, ITableRepository
    {
        private DbSet<TableDTO> _tables;

        public TableRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _tables = dbContext.Set<TableDTO>();
        }
    }
}