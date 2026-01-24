using Stock.DAL.DTOs;
using System.Share.Models;

namespace Stock.BLL.IHelpers
{
    public interface IHandbookHelper
    {
        public Task<Pagination<HandbookDTO>> GetAllAsync(int pageIndex, int pageSize);
        public Task<HandbookDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(HandbookDTO model, string? userName = null);
        public Task<bool> UpdateAsync(HandbookDTO model, string? userName = null);
        public Task<bool> SoftDeleteAsync(Guid id, string? userName = null);
        public Task<bool> RestoreAsync(Guid id, string? userName = null);
        public Task<bool> DeleteAsync(Guid id);
    }
}
