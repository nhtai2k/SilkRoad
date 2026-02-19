using Survey.DAL.DTOs;

namespace Survey.BLL.IHelpers
{
    public interface IQuestionGroupHelper
    {
        public Task<IEnumerable<QuestionGroupDTO>?> GetBySurveyFormIdAsync(int surveyFormId);
        public Task<QuestionGroupDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(QuestionGroupDTO model);
        public Task<bool> UpdateAsync(QuestionGroupDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
