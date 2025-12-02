namespace SurveyDataAccess.DTOs
{
    public class StoreDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Representative { get; set; }
    }
}
