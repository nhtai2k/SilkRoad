namespace RestaurantDataAccess.DTOs
{
    public class UnitDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public required string NameCN { get; set; }
        public string? Note { get; set; }
        public int Priority { get; set; }
    }
}
