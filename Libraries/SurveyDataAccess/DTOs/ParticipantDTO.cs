namespace Survey.DAL.DTOs
{
    public class ParticipantDTO
    {
        public Guid Id { get; set; }
        public int SurveyFormId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CreatedBy { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool IsRejected { get; set; } = false;
        public bool IsHighlighted { get; set; } = false;
        public bool IsReviewMode { get; set; } = false;
        public string? Reason { get; set; }
        public SurveyFormDTO? SurveyForm { get; set; }
        public ICollection<AnswerDTO>? Answers { get; set; }
        public ICollection<ParticipantInfoDTO>? ParticipantInfos { get; set; }
    }
}
