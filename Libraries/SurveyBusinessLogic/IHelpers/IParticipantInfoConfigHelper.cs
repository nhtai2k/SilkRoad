using Survey.DAL.DTOs;

namespace Survey.BLL.IHelpers
{
    public interface IParticipantInfoConfigHelper
    {
        public Task<IEnumerable<ParticipantInfoConfigDTO>> GetBySurveyFormIdAsync(int surveyFormId);
        public Task<ParticipantInfoConfigDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(ParticipantInfoConfigDTO model, string? userName = null);
        public Task<bool> UpdateAsync(ParticipantInfoConfigDTO model, string? userName = null);
        public Task<bool> DeleteAsync(Guid id);
    }
}
