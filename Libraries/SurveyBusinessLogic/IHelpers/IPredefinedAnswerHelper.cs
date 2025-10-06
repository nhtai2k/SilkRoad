using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IPredefinedAnswerHelper
    {
        public Task<ICollection<PredefinedAnswerDTO>> GetByQuestionIdAsync(Guid questionId);
        public Task<PredefinedAnswerDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(PredefinedAnswerDTO model);
        public Task<bool> UpdateAsync(PredefinedAnswerDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
