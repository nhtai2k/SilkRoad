using BOM.DAL.DTOs;

namespace BOM.BLL.IHelpers
{
    public interface IBOMCommandHelper
    {
        public Task<BOMDTO?> CreateAsync(BOMDTO model, string? userName = null);
        public Task<bool> UpdateAsync(BOMDTO model, string? userName = null);
        public Task<bool> SoftDeleteAsync(int id, string? userName = null);
        public Task<bool> RestoreAsync(int id, string? userName = null);
        public Task<bool> DeleteAsync(int id);

    }
}
