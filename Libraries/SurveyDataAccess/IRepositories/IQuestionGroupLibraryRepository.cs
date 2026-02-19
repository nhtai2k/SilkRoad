using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IQuestionGroupLibraryRepository : IGenericRepository<QuestionGroupLibraryDTO>
    {
        Task<IEnumerable<QuestionGroupLibraryDTO>> GetEagerLoadingAsync();
    }
}
