using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionTypeHelper : IQuestionTypeHelper
    {
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly IMapper _mapper;
        //public QuestionTypeHelper(IUnitOfWork unitOfWork, IMapper mapper)
        //{
        //    _unitOfWork = unitOfWork;
        //    _mapper = mapper;
        //}
        //public async Task<IEnumerable<QuestionTypeViewModel>> GetAllAsync()
        //{
        //    var data = await _unitOfWork.QuestionTypeRepository.GetAllAsync();
        //    return _mapper.Map<IEnumerable<QuestionTypeViewModel>>(data);
        //}
        public Task<IEnumerable<QuestionTypeDTO>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
