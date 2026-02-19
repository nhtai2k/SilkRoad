namespace Survey.DAL.DTOs
{
    //IsActive indicates whether the survey is currently active or inactive.
    public class SurveyFormDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? StoreId { get; set; }
        public int FormStyleId { get; set; }
        public required string Name { get; set; }
        public required string TitleEN { get; set; }
        public required string TitleVN { get; set; }
        public required string DescriptionEN { get; set; }
        public required string DescriptionVN { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsLimited { get; set; }
        // Indicates whether the survey is published and accessible to participants
        public bool IsPublished { get; set; }
        public int MaxParticipants { get; set; }
        public string? Note { get; set; }
        public ICollection<ParticipantDTO>? Participants { get; set; }
        public ICollection<QuestionGroupDTO>? QuestionGroups { get; set; }
        public ICollection<QuestionDTO>? Questions { get; set; }
        public ICollection<ParticipantInfoConfigDTO>? ParticipantInfoConfigs { get; set; }
        //public SurveyFormDTO()
        //{
        //    QuestionGroups = new List<QuestionGroupDTO>();
        //    Questions = new List<QuestionDTO>();
        //}

    }
}
