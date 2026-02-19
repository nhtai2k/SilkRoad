using Microsoft.EntityFrameworkCore.Storage;
using Survey.DAL.IRepositories;

namespace Survey.DAL
{
    public interface IUnitOfWork : IDisposable
    {

        IParticipantRepository ParticipantRepository { get; }
        IPredefinedAnswerRepository PredefinedAnswerRepository { get; }
        IPredefinedAnswerLibraryRepository PredefinedAnswerLibraryRepository { get; }
        IQuestionGroupRepository QuestionGroupRepository { get; }
        IQuestionGroupLibraryRepository QuestionGroupLibraryRepository { get; }
        IParticipantInfoRepository ParticipantInfoRepository { get; }
        IParticipantInfoConfigRepository ParticipantInfoConfigRepository { get; }
        IQuestionTypeRepository QuestionTypeRepository { get; }
        IQuestionRepository QuestionRepository { get; }
        IQuestionLibraryRepository QuestionLibraryRepository { get; }
        ISurveyFormRepository SurveyFormRepository { get; }
        IAnswerRepository AnswerRepository { get; }
        IStoreRepository StoreRepository { get; }
        IDbContextTransaction BeginTransaction();
        void Commit();
        void Rollback();
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
