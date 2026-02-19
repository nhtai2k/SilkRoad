namespace Survey.BLL.Models
{
    public class ParticipantFilterModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int SurveyFormId { get; set; }
        public bool? IsComplete { get; set; }
        public bool? IsRejected { get; set; }
        public bool? IsHighlighted { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
