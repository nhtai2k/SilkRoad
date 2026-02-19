using BOM.DAL.DTOs;

namespace BOM.DAL.IRepositories
{
    public interface IRankRepository : IGenericRepository<RankDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
