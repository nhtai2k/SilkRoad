using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IBOMRepository : IGenericRepository<BOMDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
