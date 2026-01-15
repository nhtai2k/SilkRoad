namespace Common.Models
{
    public class MongoDBSettings
    {
        public required string ConnectionString { get; set; }

        public required string LoggingDatabaseName { get; set; }

        public required string LoggingCollectionName { get; set; }
        public required string ChatbotDatabaseName { get; set; }
    }
}
