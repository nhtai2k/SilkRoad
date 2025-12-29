using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IKitchenRepository : IGenericRepository<KitchenDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
