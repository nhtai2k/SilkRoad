using Common.Models;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionTypeHelper
    {
        public Task<IEnumerable<QuestionTypeDTO>> GetAllAsync();
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
