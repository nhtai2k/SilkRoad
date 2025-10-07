using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IPredefinedAnswerLibraryHelper
    {
        public Task<IEnumerable<PredefinedAnswerLibraryDTO>> GetByQuestionLibraryIdAsync(int questionLibraryId);
        public Task<PredefinedAnswerLibraryDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(PredefinedAnswerLibraryDTO model);
        public Task<bool> UpdateAsync(PredefinedAnswerLibraryDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
