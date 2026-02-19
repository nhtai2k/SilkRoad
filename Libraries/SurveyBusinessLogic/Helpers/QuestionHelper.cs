using Survey.BLL.IHelpers;
using Survey.DAL;
using Survey.DAL.DTOs;

namespace Survey.BLL.Helpers
{
    public class QuestionHelper : IQuestionHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateAsync(QuestionDTO model)
        {
            if (model == null) return false;
            if (model.Id == Guid.Empty)
                model.Id = Guid.NewGuid();
            await _unitOfWork.QuestionRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var result = await _unitOfWork.QuestionRepository.DeleteAsync(id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }

        public async Task<QuestionDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.QuestionRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<QuestionDTO>> GetByQuestionGroupIdAsync(Guid questionGroupId)
        {
            return await _unitOfWork.QuestionRepository.GetEagerLoadingByQuestionGroupIdAsync(questionGroupId);
        }

        public async Task<IEnumerable<QuestionDTO>> GetBySurveyFormIdAsync(int surveyFormId)
        {
            return await _unitOfWork.QuestionRepository.GetEagerLoadingBySurveyFormIdAsync(surveyFormId);
        }

        public async Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id)
        {
            var data = await _unitOfWork.QuestionRepository.GetEagerLoadingByIdAsync(id);
            return data;
        }

        public async Task<bool> UpdateAsync(QuestionDTO model)
        {
            var data = await _unitOfWork.QuestionRepository.GetByIdAsync(model.Id);
            if (data == null)
                return false;
            data.NameEN = model.NameEN.Trim();
            data.NameVN = model.NameVN.Trim();
            data.Priority = model.Priority;
            data.QuestionTypeId = model.QuestionTypeId;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
    }
}
