using Survey.DAL.DTOs;

namespace Survey.DAL.IRepositories
{
    public interface IAnswerRepository : IGenericRepository<AnswerDTO>
    {
        //public Task<List<AverageScoreDTO>> GetAverageScoreByDateAsync(int surveyId, DateTime startTime, DateTime finishTime, int optionQuestionTypeId);
    }
}
