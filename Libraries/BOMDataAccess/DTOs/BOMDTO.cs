namespace BOM.DAL.DTOs
{
    public class BOMDTO : BaseDTO
    {
        public int Id { get; set; }
        public int DishGroupId { get; set; }
        public int DishId { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
        public ICollection<BOMCategoryDTO>? BOMCategories { get; set; }
    }
}
