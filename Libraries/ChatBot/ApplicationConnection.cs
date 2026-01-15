using ChatBot.Models;
using Common.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ChatBot
{
    public class ApplicationConnection
    {
        public readonly IMongoCollection<MessageModel> _messagesCollection;
        public readonly IMongoCollection<ConversationModel> _conversationsCollection;
        public readonly IMongoCollection<PromptModel> _promptCollection;

        public ApplicationConnection(
            IOptions<MongoDBSettings> mongoDBSettings)
        {
            var mongoClient = new MongoClient(
                mongoDBSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                mongoDBSettings.Value.LoggingDatabaseName);
            _conversationsCollection = mongoDatabase.GetCollection<ConversationModel>("Conversations");
            _messagesCollection = mongoDatabase.GetCollection<MessageModel>("Messages");
            _promptCollection = mongoDatabase.GetCollection<PromptModel>("Prompts");
        }
    }
}
