using BOMDataAccess.DTOs;
using BOMDataAccess.QureyModels;

namespace BOMDataAccess.IRepositories
{
    public interface IDishRepository : IGenericRepository<DishDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
        public Task<ICollection<DishQueryModel>> ExportDataAsync();
    }
}
