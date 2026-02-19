namespace Survey.DAL.DTOs
{
    public class ParticipantInfoConfigDTO : BaseDTO
    {
        public Guid Id { get; set; }
        public int SurveyFormId { get; set; }
        public required string FieldNameEN { get; set; }
        public required string FieldNameVN { get; set; }
        public string? PlaceholderEN { get; set; }
        public string? PlaceholderVN { get; set; }
        // e.g., text, number, email, date, etc.
        public int TypeId { get; set; }
        public int Priority { get; set; }
        public int MinLength { get; set; }
        public int MaxLength { get; set; }
        public bool IsRequired { get; set; }
        public SurveyFormDTO? SurveyForm { get; set; }
    }
}
