using System;

namespace ChatBot.Models;

public class ConversationFilterModel
{
    public int PageSize { get; set; } = 10;
    public int PageIndex { get; set; } = 0;
    public required string Source { get; set; }
    public string? SearchText { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
