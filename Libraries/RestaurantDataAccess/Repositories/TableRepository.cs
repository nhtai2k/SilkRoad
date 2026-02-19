using Microsoft.EntityFrameworkCore;
using Restaurant.DAL.DTOs;
using Restaurant.DAL.IRepositories;

namespace Restaurant.DAL.Repositories
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