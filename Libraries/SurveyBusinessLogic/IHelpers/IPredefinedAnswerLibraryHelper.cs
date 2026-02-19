using Survey.DAL.DTOs;

namespace Survey.BLL.IHelpers
{
    public interface IPredefinedAnswerLibraryHelper
    {
        public Task<IEnumerable<PredefinedAnswerLibraryDTO>> GetByQuestionLibraryIdAsync(int questionLibraryId);
        public Task<PredefinedAnswerLibraryDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(PredefinedAnswerLibraryDTO model);
        public Task<bool> UpdateAsync(PredefinedAnswerLibraryDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
