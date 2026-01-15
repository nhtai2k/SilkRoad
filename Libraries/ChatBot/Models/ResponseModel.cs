using System;

namespace ChatBot.Models
{
    public class ResponseModel
    {
       public Guid ConversationId { get; set; }
       public string Response { get; set; } = null!;
    }
}

