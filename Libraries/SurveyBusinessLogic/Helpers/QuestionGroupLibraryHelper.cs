using Common.Models;
using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class QuestionGroupLibraryHelper : IQuestionGroupLibraryHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public QuestionGroupLibraryHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task<Pagination<QuestionGroupLibraryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<QuestionGroupLibraryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CreateAsync(QuestionGroupLibraryDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<QuestionGroupLibraryDTO?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OptionModel>> GetOptionListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(QuestionGroupLibraryDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }
    }
}
