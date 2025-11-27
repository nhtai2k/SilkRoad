namespace PersonalFinanceDataAccess.DTOs
{
    public class SubCategoryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public string? Note { get; set; }
        public int Priority { get; set; }
        public CategoryDTO? Category { get; set; }
    }
}
