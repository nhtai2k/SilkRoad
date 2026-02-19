using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.IHelpers
{
    public interface IQuestionTypeHelper
    {
        public Task<IEnumerable<QuestionTypeDTO>> GetAllAsync();
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
