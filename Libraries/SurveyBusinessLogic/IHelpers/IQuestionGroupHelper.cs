using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionGroupHelper
    {
        public Task<IEnumerable<QuestionGroupDTO>?> GetBySurveyFormIdAsync(int surveyFormId);
        public Task<QuestionGroupDTO?> GetByIdAsync(Guid id);
        public Task<bool> CreateAsync(QuestionGroupDTO model);
        public Task<bool> UpdateAsync(QuestionGroupDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
