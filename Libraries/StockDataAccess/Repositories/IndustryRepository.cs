using StockDataAccess;
using StockDataAccess.DTOs;
using StockDataAccess.IRepositories;
using StockDataAccess.Repositories;

public class IndustryRepository : GenericRepository<IndustryDTO>, IIndustryRepository
{
    public IndustryRepository(ApplicationContext context) : base(context)
    {
    }
}