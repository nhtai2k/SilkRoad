namespace Survey.DAL.DTOs
{
    public class ParticipantInfoDTO
    {
        public Guid ParticipantInfoConfigId { get; set; }
        public Guid ParticipantId { get; set; }
        public int TypeId { get; set; }
        public string? TextValue { get; set; }
        public int? NumberValue { get; set; }
        public DateTime? DateValue { get; set; }
        public ParticipantDTO? Participant { get; set; }
    }
}
