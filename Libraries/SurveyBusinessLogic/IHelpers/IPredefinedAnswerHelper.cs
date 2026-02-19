using Survey.DAL.DTOs;

namespace Survey.BLL.IHelpers
{
    public interface IPredefinedAnswerHelper
    {
        public Task<IEnumerable<PredefinedAnswerDTO>> GetByQuestionIdAsync(Guid questionId);
        public Task<PredefinedAnswerDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(PredefinedAnswerDTO model);
        public Task<bool> UpdateAsync(PredefinedAnswerDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
