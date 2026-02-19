using Survey.BLL.IHelpers;
using Survey.DAL;
using Survey.DAL.DTOs;

namespace Survey.BLL.Helpers
{
    public class QuestionGroupHelper : IQuestionGroupHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionGroupHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateAsync(QuestionGroupDTO model)
        {
            if (model == null) return false;
            if (model.Id == Guid.Empty)
                model.Id = Guid.NewGuid();
            await _unitOfWork.QuestionGroupRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var result = await _unitOfWork.QuestionGroupRepository.DeleteAsync(id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }

        public async Task<QuestionGroupDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.QuestionGroupRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<QuestionGroupDTO>?> GetBySurveyFormIdAsync(int surveyFormId)
        {
            return await _unitOfWork.QuestionGroupRepository.GetEagerLoadingBySurveyFormIdAsync(surveyFormId);
        }

        public async Task<bool> UpdateAsync(QuestionGroupDTO model)
        {
            var result = await _unitOfWork.QuestionGroupRepository.UpdateAsync(model, model.Id);

            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }
    }
}
