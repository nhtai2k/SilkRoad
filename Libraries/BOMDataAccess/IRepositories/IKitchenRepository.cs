using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IKitchenRepository : IGenericRepository<KitchenDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
