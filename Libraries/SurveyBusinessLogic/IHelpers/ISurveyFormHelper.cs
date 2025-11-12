using Common.Models;
using SurveyBusinessLogic.Models;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface ISurveyFormHelper
    {
        public Task<SurveyFormDTO?> GetEagerLoadingByIdAsync(int id);
        public Task<SurveyFormDTO?> GetReviewFormByIdAsync(int id);
        public Task<SurveyFormDTO?> GetPublicFormByIdAsync(int id);
        public Task<Pagination<SurveyFormDTO>> GetAllAsync(int pageIndex, int pageSize);
        public Task<Pagination<SurveyFormDTO>> FilterAsync(SurveyFormFilterModel filter);
        public Task<Pagination<SurveyFormDTO>> GetAllDeletedAsync(int pageIndex, int pageSize);
        public Task<SurveyFormDTO?> GetByIdAsync(int id);
        public Task<SurveyFormDTO?> CreateAsync(SurveyFormDTO model, string? userName = null);
        public Task<bool> UpdateAsync(SurveyFormDTO model, string? userName = null);
        public Task<bool> PublishAsync(int id, string? userName = null);
        public Task<bool> UnpublishAsync(int id, string? userName = null);
        public Task<bool> SoftDeleteAsync(int id, string? userName = null);
        public Task<bool> RestoreAsync(int id, string? userName = null);
        public Task<bool> DeleteAsync(int id);
        public Task<bool> DeactivateAsync(int id, string? userName = null);
        public Task<bool> ActivateAsync(int id, string? userName = null);

    }
}
