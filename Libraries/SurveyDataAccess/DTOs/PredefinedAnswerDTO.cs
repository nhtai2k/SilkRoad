namespace Survey.DAL.DTOs
{
    public class PredefinedAnswerDTO
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public required string NameVN { get; set; }
        public required string NameEN { get; set; }
        public int Priority { get; set; }
        public QuestionDTO? Question { get; set; }
    }
}
