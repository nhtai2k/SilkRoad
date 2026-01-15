namespace ChatBot.Models
{
    public class ChatResponseDto
    {
        public string Request { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Response { get; set; } = string.Empty;
        public IList<long>? Context { get; set; }
        public bool Stream { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool Success { get; set; } = true;
        public string? ErrorMessage { get; set; }
    }
}
