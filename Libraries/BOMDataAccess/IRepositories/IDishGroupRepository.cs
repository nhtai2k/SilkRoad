using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IDishGroupRepository : IGenericRepository<DishGroupDTO>
    {
        public Task<DishGroupDTO?> GetEargerByIdAsync(int Id);
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
