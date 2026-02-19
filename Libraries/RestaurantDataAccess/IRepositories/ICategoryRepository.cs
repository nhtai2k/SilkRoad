using Restaurant.DAL.DTOs;

namespace Restaurant.DAL.IRepositories
{
    public interface ICategoryRepository : IGenericRepository<CategoryDTO>
    {
        public Task<CategoryDTO?> GetEargerByIdAsync(int Id);
        public Task<ICollection<CategoryDTO>?> GetAllEagerCategoriesAsync();
        //public Task<bool> IsCodeExistsAsync(string code);
    }
}
