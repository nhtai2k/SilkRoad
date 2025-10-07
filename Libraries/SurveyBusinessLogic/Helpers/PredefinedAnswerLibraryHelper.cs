using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.Helpers
{
    public class PredefinedAnswerLibraryHelper : IPredefinedAnswerLibraryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public PredefinedAnswerLibraryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateAsync(PredefinedAnswerLibraryDTO model)
        {
            if (model == null) return false;
            if (model.Id == Guid.Empty)
                model.Id = Guid.NewGuid();
            await _unitOfWork.PredefinedAnswerLibraryRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var result = await _unitOfWork.PredefinedAnswerLibraryRepository.DeleteAsync(id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }

        public async Task<PredefinedAnswerLibraryDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.PredefinedAnswerLibraryRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<PredefinedAnswerLibraryDTO>> GetByQuestionLibraryIdAsync(int questionId)
        {
            return await _unitOfWork.PredefinedAnswerLibraryRepository.GetByQuestionLibraryIdAsync(questionId);
        }

        public async Task<bool> UpdateAsync(PredefinedAnswerLibraryDTO model)
        {
            var result = await _unitOfWork.PredefinedAnswerLibraryRepository.UpdateAsync(model, model.Id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }
    }
}
