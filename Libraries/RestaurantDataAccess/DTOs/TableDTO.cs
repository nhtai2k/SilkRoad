namespace Restaurant.DAL.DTOs
{
    public class TableDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public required string NameCN { get; set; }
        public string? Note { get; set; }
        public int Capacity { get; set; }
        public bool IsFree { get; set; }
        public int Priority { get; set; }
    }
}
