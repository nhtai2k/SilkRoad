using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceDataAccess.IRepositories
{
    public interface ICategoryRepository : IGenericRepository<CategoryDTO>
    {
        public Task<IEnumerable<CategoryDTO>> GetEagerLoadingAsync();
    }
}
