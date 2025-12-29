using BOMDataAccess.DTOs;

namespace BOMDataAccess.IRepositories
{
    public interface IRankRepository : IGenericRepository<RankDTO>
    {
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
