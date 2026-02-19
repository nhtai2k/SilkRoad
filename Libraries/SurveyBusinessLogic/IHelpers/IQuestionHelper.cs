using Survey.DAL.DTOs;

namespace Survey.BLL.IHelpers
{
    public interface IQuestionHelper
    {
        public Task<IEnumerable<QuestionDTO>> GetByQuestionGroupIdAsync(Guid questionGroupId);
        public Task<IEnumerable<QuestionDTO>> GetBySurveyFormIdAsync(int surveyFormId);
        public Task<QuestionDTO?> GetByIdAsync(Guid id);
        public Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id);
        public Task<bool> CreateAsync(QuestionDTO model);
        public Task<bool> UpdateAsync(QuestionDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
