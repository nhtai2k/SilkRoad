using Common.Models;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IBaseAsyncHelper<T> where T : class
    {
        public Task<Pagination<T>> GetAllAsync(int pageIndex, int pageSize);
        public Task<Pagination<T>> GetAllDeletedAsync(int pageIndex, int pageSize);
        public Task<T?> GetByIdAsync(int id);
        public Task<bool> CreateAsync(T model, string? userName = null);
        public Task<bool> UpdateAsync(T model, string? userName = null);
        public Task<bool> SoftDeleteAsync(int id, string? userName = null);
        public Task<bool> RestoreAsync(int id, string? userName = null);
        public Task<bool> DeleteAsync(int id);
    }
}
