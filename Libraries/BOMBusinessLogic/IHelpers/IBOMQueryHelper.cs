using BOMDataAccess.DTOs;
using Common.Models;

namespace BOMBusinessLogic.IBOMHelpers
{
    public interface IBOMQueryHelper
    {
        public Task<Pagination<BOMDTO>> GetAllAsync(int pageIndex, int pageSize);
        public Task<Pagination<BOMDTO>> GetAllDeletedAsync(int pageIndex, int pageSize);
        public Task<BOMDTO?> GetByIdAsync(int id);
        public Task<bool> IsCodeExistsAsync(string code);
    }
}
