using Common.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Pagination<ParticipantDTO>> FilterAsync(ParticipantFilterModel filter)
        {
            var query = _unitOfWork.ParticipantRepository.Query(x => true).AsNoTracking();
            if (filter.SurveyFormId != -1)
            {
                query = query.Where(s => s.SurveyFormId == filter.SurveyFormId);
            }
            if (filter.IsComplete != null)
            {
                query = query.Where(s => s.IsComplete == filter.IsComplete);
            }
            if (filter.IsRejected != null)
            {
                query = query.Where(s => s.IsRejected == filter.IsRejected);
            }
            if (filter.IsHighlighted != null)
            {
                query = query.Where(s => s.IsHighlighted == filter.IsHighlighted);
            }
            if (filter.StartDate != null)
            {
                query = query.Where(s => s.CreatedAt >= filter.StartDate);
            }
            if (filter.EndDate != null)
            {
                query = query.Where(s => s.CreatedAt <= filter.EndDate);
            }

            int totalItems = await query.CountAsync();
            int totalPages = (int)Math.Ceiling(totalItems / (double)filter.PageSize);
            if (filter.PageIndex > totalPages)
                filter.PageIndex = totalPages > 0 ? totalPages : 1;
            var items = await query.Skip((filter.PageIndex - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();
            return new Pagination<ParticipantDTO>
            {
                PageIndex = filter.PageIndex,
                PageSize = filter.PageSize,
                CurrentPage = filter.PageIndex,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };
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

        public async Task<bool> HighlightAsync(Guid id)
        {
            var data = await _unitOfWork.ParticipantRepository.GetByIdAsync(id);

            if (data == null)
                return false;

            data.IsHighlighted = true;

            _unitOfWork.SaveChanges();
            return true;
        }

        public async Task<bool> RemoveHighlightAsync(Guid id)
        {
            var data = await _unitOfWork.ParticipantRepository.GetByIdAsync(id);

            if (data == null)
                return false;

            data.IsHighlighted = false;

            _unitOfWork.SaveChanges();
            return true;
        }

        public async Task<bool> RejectAsync(Guid id, string reason)
        {
            var data = await _unitOfWork.ParticipantRepository.GetByIdAsync(id);

            if (data == null)
                return false;

            data.IsRejected = true;
            data.Reason = reason;

            _unitOfWork.SaveChanges();
            return true;
        }
    }
}
