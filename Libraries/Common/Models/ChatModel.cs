using System.ComponentModel.DataAnnotations;

namespace Common.Models
{
    public class ChatModel
    {
        [Required]
        public required string Request { get; set; }
        [Required]
        public required int Mod { get; set; }
        public string? Response { get; set; }
        public bool Stream { get; set; } = false;
        // Add context messages for chat continuation
        public List<ChatMessageContext>? ContextMessages { get; set; }
    }
    public class ChatMessageContext
    {
        public string Role { get; set; } = "user"; // "system", "user", "assistant"
        public string Content { get; set; } = string.Empty;
    }
}
