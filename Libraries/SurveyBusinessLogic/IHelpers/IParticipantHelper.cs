using Survey.BLL.Models;
using Survey.DAL.DTOs;
using System.Share.Models;

namespace Survey.BLL.IHelpers
{
    public interface IParticipantHelper
    {
        public Task<Pagination<ParticipantDTO>> FilterAsync(ParticipantFilterModel filter);
        public Task<string> ExportExcel(ParticipantFilterModel filter);
        public Task<bool> CreateAsync(ParticipantDTO model);
        public Task<ParticipantDTO?> InitAsync(ParticipantDTO model);
        public Task<bool> AddAnswersAsync(List<AnswerDTO> answers);
        public Task<ParticipantDTO?> GetByIdAsync(Guid id);
        public Task<bool> HighlightAsync(Guid id);
        public Task<bool> RemoveHighlightAsync(Guid id);
        public Task<bool> RejectAsync(Guid id, string reason);

    }
}
