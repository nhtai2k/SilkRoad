using System.ComponentModel.DataAnnotations;

namespace ChatBot.Models
{
    public class ChatRequestDto
    {
        [Required]
        [StringLength(2000, MinimumLength = 1, ErrorMessage = "Message must be between 1 and 2000 characters")]
        public required string Request { get; set; }

        [StringLength(50, ErrorMessage = "Model name cannot exceed 50 characters")]
        public string? Model { get; set; }

        public IList<long>? Context { get; set; }

        public bool Stream { get; set; } = false;
    }
}
