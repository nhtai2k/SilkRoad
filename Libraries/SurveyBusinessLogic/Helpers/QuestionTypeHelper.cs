using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionTypeHelper : IQuestionTypeHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionTypeHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<QuestionTypeDTO>> GetAllAsync()
        {
            return await _unitOfWork.QuestionTypeRepository.GetAllAsync();
        }
    }
}
