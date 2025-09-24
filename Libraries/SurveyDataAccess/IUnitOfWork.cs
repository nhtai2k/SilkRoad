using Microsoft.EntityFrameworkCore.Storage;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess
{
    public interface IUnitOfWork : IDisposable
    {

        IParticipantRepository ParticipantRepository { get; }
        IPredefinedAnswerRepository PredefinedAnswerRepository { get; }
        IPredefinedAnswerLibraryRepository PredefinedAnswerLibraryRepository { get; }
        IQuestionGroupRepository QuestionGroupRepository { get; }
        IQuestionGroupLibraryRepository QuestionGroupLibraryRepository { get; }
        IQuestionTypeRepository QuestionTypeRepository { get; }
        IQuestionRepository QuestionRepository { get; }
        IQuestionLibraryRepository QuestionLibraryRepository { get; }
        ISurveyFormRepository SurveyFormRepository { get; }
        IAnswerRepository AnswerRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
