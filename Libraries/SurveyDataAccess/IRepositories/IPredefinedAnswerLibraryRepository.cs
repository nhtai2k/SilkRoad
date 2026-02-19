using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IPredefinedAnswerLibraryRepository : IGenericRepository<PredefinedAnswerLibraryDTO>
    {
        //public Task<bool> DeleteByQuestionLibraryIdAsync(int questionLibraryId);
        public Task<ICollection<PredefinedAnswerLibraryDTO>> GetByQuestionLibraryIdAsync(int questionLibraryId);
    }
}
