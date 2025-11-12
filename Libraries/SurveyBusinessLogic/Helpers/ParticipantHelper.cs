using Common.Models;
using SurveyBusinessLogic.IHelpers;
using SurveyBusinessLogic.Models;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class ParticipantHelper : IParticipantHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ParticipantHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Task<ParticipantDTO?> CreateAsync(ParticipantDTO model)
        {
            throw new NotImplementedException();
        }

        public Task<string> ExportExcel(ParticipantFilterModel filter)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<ParticipantDTO>> FilterAsync(ParticipantFilterModel filter)
        {
            throw new NotImplementedException();
        }

        public Task<ParticipantDTO?> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
