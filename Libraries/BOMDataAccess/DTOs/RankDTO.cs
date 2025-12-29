namespace BOMDataAccess.DTOs
{
    public class RankDTO : BaseDTO
    {
        public int Id { get; set; }
        public int TimeUnitId { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public double Salary { get; set; }
        public string? Note { get; set; }
    }
}
