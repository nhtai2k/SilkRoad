namespace SurveyDataAccess.DTOs
{
    public class SurveyFormDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string TitleEN { get; set; }
        public required string TitleVN { get; set; }
        public required string DescriptionEN { get; set; }
        public required string DescriptionVN { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Note { get; set; }
        public ICollection<ParticipantDTO>? Participants { get; set; }
        public ICollection<QuestionGroupDTO> QuestionGroups { get; set; }
        public ICollection<QuestionDTO> Questions { get; set; }
        public SurveyFormDTO()
        {
            QuestionGroups = new List<QuestionGroupDTO>();
            Questions = new List<QuestionDTO>();
        }

    }
}
