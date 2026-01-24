using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChatBot.Models;

public class ConversationModel
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public required string Source { get; set; }
    public DateTime Timestamp { get; set; }
    public ConversationModel()
    {
        Id = Guid.NewGuid();
        Timestamp = DateTime.Now;
    }
}