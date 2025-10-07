using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyDataAccess.IRepositories
{
    public interface IPredefinedAnswerLibraryRepository : IGenericRepository<PredefinedAnswerLibraryDTO>
    {
        //public Task<bool> DeleteByQuestionLibraryIdAsync(int questionLibraryId);
        public Task<ICollection<PredefinedAnswerLibraryDTO>> GetByQuestionLibraryIdAsync(int questionLibraryId);
    }
}
