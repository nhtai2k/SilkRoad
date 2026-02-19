using Survey.BLL.Models;
using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.IHelpers
{
    public interface IQuestionLibraryHelper : IBaseAsyncHelper<QuestionLibraryDTO>
    {
        public Task<QuestionLibraryDTO?> GetEagerLoadingByIdAsync(int id);
        public Task<Pagination<QuestionLibraryDTO>> GetByFilterAsync(QuestionLibraryFilterModel filter);

    }
}
