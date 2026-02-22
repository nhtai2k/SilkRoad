using Stock.DAL.DTOs;

namespace Stock.DAL.IRepositories
{
    public interface ICompanyRepository : IGenericRepository<CompanyDTO>
    {
        public Task<CompanyDTO?> GetCompanyBySymbolAsync(string symbol);
    }
}
