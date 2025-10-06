using Common.Models;
using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionHelper
    {
        public Task<ICollection<QuestionDTO>> GetByQuestionGroupIdAsync(Guid questionGroupId);
        public Task<ICollection<QuestionDTO>> GetBySurveyFormIdAsync(int surveyFormId);
        public Task<QuestionDTO?> GetByIdAsync(Guid id);
        public Task<QuestionDTO?> GetEagerLoadingByIdAsync(Guid id);
        public Task<bool> CreateAsync(QuestionDTO model);
        public Task<bool> UpdateAsync(QuestionDTO model);
        public Task<bool> DeleteAsync(Guid id);
    }
}
