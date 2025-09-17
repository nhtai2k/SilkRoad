namespace SurveyDataAccess.DTOs
{
    public class ParticipantDTO
    {
        public Guid Id { get; set; }
        public int SurveyFormId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? Note { get; set; }
        public SurveyFormDTO? SurveyForm { get; set; }
        public ICollection<AnswerDTO>? Answers { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public ParticipantDTO()
        {
            CreatedAt = DateTime.Now;
        }
    }
}
