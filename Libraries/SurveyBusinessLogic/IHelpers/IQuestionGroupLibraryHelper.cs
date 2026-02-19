using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.IHelpers
{
    public interface IQuestionGroupLibraryHelper : IBaseAsyncHelper<QuestionGroupLibraryDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
    }
}
