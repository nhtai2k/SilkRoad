namespace ChatBot.Models
{
    public class PromptModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Prompt { get; set; }
        public string? Description { get; set; }
    }
}
