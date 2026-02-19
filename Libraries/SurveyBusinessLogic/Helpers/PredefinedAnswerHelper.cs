using Survey.BLL.IHelpers;
using Survey.DAL;
using Survey.DAL.DTOs;

namespace Survey.BLL.Helpers
{
    public class PredefinedAnswerHelper : IPredefinedAnswerHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public PredefinedAnswerHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreateAsync(PredefinedAnswerDTO model)
        {
            if (model == null) return false;
            if (model.Id == Guid.Empty)
                model.Id = Guid.NewGuid();
            await _unitOfWork.PredefinedAnswerRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var result = await _unitOfWork.PredefinedAnswerRepository.DeleteAsync(id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }

        public async Task<PredefinedAnswerDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.PredefinedAnswerRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<PredefinedAnswerDTO>> GetByQuestionIdAsync(Guid questionId)
        {
            return await _unitOfWork.PredefinedAnswerRepository.GetByQuestionIdAsync(questionId);
        }

        public async Task<bool> UpdateAsync(PredefinedAnswerDTO model)
        {
            var result = await _unitOfWork.PredefinedAnswerRepository.UpdateAsync(model, model.Id);
            if (result)
            {
                await _unitOfWork.SaveChangesAsync();
            }
            return result;
        }
    }
}
