using Common.Models;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface ISurveyFormHelper
    {
        public Task<SurveyFormDTO?> GetEagerLoadingByIdAsync(int id);
        public Task<Pagination<SurveyFormDTO>> GetAllAsync(int pageIndex, int pageSize);
        public Task<Pagination<SurveyFormDTO>> GetAllDeletedAsync(int pageIndex, int pageSize);
        public Task<SurveyFormDTO?> GetByIdAsync(int id);
        public Task<SurveyFormDTO?> CreateAsync(SurveyFormDTO model, string? userName = null);
        public Task<bool> UpdateAsync(SurveyFormDTO model, string? userName = null);
        public Task<bool> PublishAsync(int id, string? userName = null);
        public Task<bool> SoftDeleteAsync(int id, string? userName = null);
        public Task<bool> RestoreAsync(int id, string? userName = null);
        public Task<bool> DeleteAsync(int id);

    }
}
