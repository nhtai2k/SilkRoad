using PersonalFinance.DAL.DTOs;

namespace PersonalFinance.DAL.IRepositories
{
    public interface ICategoryRepository : IGenericRepository<CategoryDTO>
    {
        public Task<IEnumerable<CategoryDTO>> GetEagerLoadingAsync();
    }
}
