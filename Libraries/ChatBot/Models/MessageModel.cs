using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatBot.Models
{
    public class MessageModel
    {
       [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;
        [BsonRepresentation(BsonType.String)]
        public Guid ConversationId { get; set; }
        public int PromptId { get; set; }
        public required string Model { get; set; }
        public required string Sender { get; set; } 
        public required string Message { get; set; }
        public IList<long>? Context { get; set; }
        public DateTime Timestamp { get; set; }
        public MessageModel()
        {
            Timestamp = DateTime.Now;
        }
    }
}
