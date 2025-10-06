using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.Helpers
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

        public async Task<ICollection<QuestionDTO>> GetByQuestionGroupIdAsync(Guid questionGroupId)
        {
            var items = await _unitOfWork.QuestionRepository.GetAllAsync(x => x.QuestionGroupId == questionGroupId);
            return items.ToList();
        }

        public async Task<ICollection<QuestionDTO>> GetBySurveyFormIdAsync(int surveyFormId)
        {
            var items = await _unitOfWork.QuestionRepository.GetAllAsync(x => x.SurveyFormId == surveyFormId);
            return items.ToList();
        }

        public async Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id)
        {
            var data = await _unitOfWork.QuestionRepository.GetEagerLoadingByIdAsync(id);
            return data;
        }

        public async Task<bool> UpdateAsync(QuestionDTO model)
        {
            var result = await _unitOfWork.QuestionRepository.UpdateAsync(model, model.Id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }
    }
}
