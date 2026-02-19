using BOM.DAL.DTOs;
using BOM.DAL.QureyModels;

namespace BOM.DAL.IRepositories
{
    public interface IDishRepository : IGenericRepository<DishDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
        public Task<ICollection<DishQueryModel>> ExportDataAsync();
    }
}
