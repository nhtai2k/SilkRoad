using System.ComponentModel.DataAnnotations;

namespace ChatBot.Models
{
    public class RequestModel
    {

        public Guid? ConversationId { get; set; }
        public required int PromptId { get; set; }
        public required string Model { get; set; }
        [Required]
        [MaxLength(500)]
        public required string Message { get; set; }
    }
}
