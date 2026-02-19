using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IBOMRepository : IGenericRepository<BOMDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
