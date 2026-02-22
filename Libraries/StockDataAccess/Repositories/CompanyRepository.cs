using Microsoft.EntityFrameworkCore;
using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;

namespace Stock.DAL.Repositories
{
    public class CompanyRepository : GenericRepository<CompanyDTO>, ICompanyRepository
    {
        public CompanyRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<CompanyDTO?> GetCompanyBySymbolAsync(string symbol)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Symbol == symbol);
        }
    }
}
