using Microsoft.EntityFrameworkCore;
using Survey.BLL.IHelpers;
using Survey.DAL;
using Survey.DAL.DTOs;

namespace Survey.BLL.Helpers
{
    public class ParticipantInfoConfigHelper : IParticipantInfoConfigHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ParticipantInfoConfigHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ParticipantInfoConfigDTO>> GetBySurveyFormIdAsync(int surveyFormId)
        {
            var query = _unitOfWork.ParticipantInfoConfigRepository.Query(s => s.SurveyFormId == surveyFormId, orderBy: p => p.OrderBy(x => x.Priority));
            return await query.ToListAsync();
        }

        public async Task<ParticipantInfoConfigDTO?> GetByIdAsync(Guid id)
        {
            return await _unitOfWork.ParticipantInfoConfigRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(ParticipantInfoConfigDTO model, string? userName = null)
        {
            model.Create(userName);
            await _unitOfWork.ParticipantInfoConfigRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ParticipantInfoConfigDTO model, string? userName = null)
        {
            var data = await _unitOfWork.ParticipantInfoConfigRepository.GetByIdAsync(model.Id);
            if (data == null)
            {
                return false;
            }
            data.Update(userName);
            data.FieldNameEN = model.FieldNameEN;
            data.FieldNameVN = model.FieldNameVN;
            data.PlaceholderEN = model.PlaceholderEN;
            data.PlaceholderVN = model.PlaceholderVN;
            data.TypeId = model.TypeId;
            data.MinLength = model.MinLength;
            data.MaxLength = model.MaxLength;
            data.IsRequired = model.IsRequired;
            data.Priority = model.Priority;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _unitOfWork.ParticipantInfoConfigRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

    }
}
