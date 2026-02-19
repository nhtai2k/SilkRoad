using Stock.DAL;
using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;
using Stock.DAL.Repositories;

public class IndustryRepository : GenericRepository<IndustryDTO>, IIndustryRepository
{
    public IndustryRepository(ApplicationContext context) : base(context)
    {
    }
}