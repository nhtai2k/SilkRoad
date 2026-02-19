using Microsoft.EntityFrameworkCore.Storage;
using Survey.DAL.IRepositories;
using Survey.DAL.Repositories;

namespace Survey.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationContext context;
        private IDbContextTransaction? _transaction;
        private bool disposed = false;

        public IParticipantRepository ParticipantRepository { get; private set; }

        public IPredefinedAnswerRepository PredefinedAnswerRepository { get; private set; }
        public IPredefinedAnswerLibraryRepository PredefinedAnswerLibraryRepository { get; private set; }
        public IParticipantInfoRepository ParticipantInfoRepository { get; private set; }
        public IParticipantInfoConfigRepository ParticipantInfoConfigRepository { get; private set; }
        public IQuestionGroupRepository QuestionGroupRepository { get; private set; }
        public IQuestionGroupLibraryRepository QuestionGroupLibraryRepository { get; private set; }
        public IQuestionTypeRepository QuestionTypeRepository { get; private set; }

        public IQuestionRepository QuestionRepository { get; private set; }
        public IQuestionLibraryRepository QuestionLibraryRepository { get; private set; }

        public ISurveyFormRepository SurveyFormRepository { get; private set; }
        public IStoreRepository StoreRepository { get; private set; }
        public IAnswerRepository AnswerRepository { get; private set; }
        public UnitOfWork(ApplicationContext databaseContext)
        {
            context = databaseContext;
            ParticipantRepository = new ParticipantRepository(context);
            PredefinedAnswerRepository = new PredefinedAnswerRepository(context);
            PredefinedAnswerLibraryRepository = new PredefinedAnswerLibraryRepository(context);
            QuestionGroupRepository = new QuestionGroupRepository(context);
            QuestionGroupLibraryRepository = new QuestionGroupLibraryRepository(context);
            QuestionTypeRepository = new QuestionTypeRepository(context);
            QuestionRepository = new QuestionRepository(context);
            QuestionLibraryRepository = new QuestionLibraryRepository(context);
            SurveyFormRepository = new SurveyFormRepository(context);
            AnswerRepository = new AnswerRepository(context);
            ParticipantInfoRepository = new ParticipantInfoRepository(context);
            ParticipantInfoConfigRepository = new ParticipantInfoConfigRepository(context);
            StoreRepository = new StoreRepository(context);
        }
        public void SaveChanges()
        {
            context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public IDbContextTransaction BeginTransaction()
        {
            _transaction = context.Database.BeginTransaction();
            return _transaction;
        }
        public void Commit()
        {
            try
            {
                _transaction?.Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
            finally
            {
                _transaction?.Dispose();
                _transaction = null;
            }
        }
        public void Rollback()
        {
            try
            {
                _transaction?.Rollback();
            }
            finally
            {
                _transaction?.Dispose();
                _transaction = null;
            }
        }
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
