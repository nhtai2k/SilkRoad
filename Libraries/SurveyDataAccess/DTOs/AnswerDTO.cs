namespace SurveyDataAccess.DTOs
{
    public class AnswerDTO
    {
        public int Id { get; set; }
        public Guid ParticipantId { get; set; }
        public Guid? QuestionGroupId { get; set; }
        public Guid QuestionId { get; set; }
        public int QuestionTypeId { get; set; }
        public Guid? AnswerId { get; set; }
        public string? Answer { get; set; }
        public int? Rating { get; set; }
        public ParticipantDTO? Participant { get; set; }
    }
}
