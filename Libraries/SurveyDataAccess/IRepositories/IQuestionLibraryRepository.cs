using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IQuestionLibraryRepository : IGenericRepository<QuestionLibraryDTO>
    {
        public Task<QuestionLibraryDTO?> GetEagerLoadingByIdAsync(int id);
    }
}
