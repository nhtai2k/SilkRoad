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

        public Task<string> ExportExcel(ParticipantFilterModel filter)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<ParticipantDTO>> FilterAsync(ParticipantFilterModel filter)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Meaning to create a participant along with answers. Complete the survey
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<bool> CreateAsync(ParticipantDTO model)
        {
            model.IsComplete = true;
            await _unitOfWork.ParticipantRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }
        /// <summary>
        /// Meaning to initialize a participant before adding answers
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ParticipantDTO?> InitAsync(ParticipantDTO model)
        {
            model.IsComplete = false;
            await _unitOfWork.ParticipantRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return model;
        }
        /// <summary>
        /// Meaning to add answers to an existing participant
        /// </summary>
        /// <param name="answers"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<bool> AddAnswersAsync(List<AnswerDTO> answers)
        {
            if (answers == null || answers.Count == 0) return false;
            AnswerDTO firstAswer = answers[0];
            ParticipantDTO? participant = await _unitOfWork.ParticipantRepository.GetByIdAsync(firstAswer.ParticipantId);
            if (participant == null) return false;
            participant.IsComplete = true;

            foreach (AnswerDTO answer in answers)
            {
                await _unitOfWork.AnswerRepository.CreateAsync(answer);
            }
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<ParticipantDTO?> GetByIdAsync(Guid id)
        {
            var participant = await _unitOfWork.ParticipantRepository.GetByIdAsync(id);
            return participant;
        }


    }
}
