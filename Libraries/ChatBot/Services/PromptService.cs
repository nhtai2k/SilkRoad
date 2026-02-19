using ChatBot.IServices;
using ChatBot.Models;
using MongoDB.Driver;

namespace ChatBot.Services
{
    public class PromptService : IPromptService
    {
        private readonly ApplicationConnection _applicationConnection;

        public PromptService(ApplicationConnection applicationConnection)
        {
            _applicationConnection = applicationConnection;
        }

        public async Task<IEnumerable<PromptModel>> GetAllAsync()
        {
            var prompts = await _applicationConnection._promptCollection.Find(Builders<PromptModel>.Filter.Empty).ToListAsync();
            return prompts;
        }

        public async Task<PromptModel> GetByIdAsync(int Id)
        {
            var filter = Builders<PromptModel>.Filter.Eq(x => x.Id, Id);
            return await _applicationConnection._promptCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(PromptModel entity)
        {
            await _applicationConnection._promptCollection.InsertOneAsync(entity);
        }

        public async Task UpdateAsync(PromptModel entity)
        {
            var filter = Builders<PromptModel>.Filter.Eq(x => x.Id, entity.Id);
            await _applicationConnection._promptCollection.ReplaceOneAsync(filter, entity);
        }

        public async Task DeleteAsync(int Id)
        {
            var filter = Builders<PromptModel>.Filter.Eq(x => x.Id, Id);
            await _applicationConnection._promptCollection.DeleteOneAsync(filter);
        }
    }
}
