namespace PersonalFinance.DAL.DTOs
{
    public class AssetTypeDTO : BaseDTO
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public required string Name { get; set; }
        public ICollection<AssetDTO>? Assets { get; set; }
    }
}
