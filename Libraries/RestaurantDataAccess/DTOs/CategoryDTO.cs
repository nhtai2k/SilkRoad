namespace RestaurantDataAccess.DTOs
{
    public class CategoryDTO : BaseDTO
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public required string NameCN { get; set; }
        public string? Note { get; set; }
        public int Priority { get; set; }
        public CategoryDTO? Parent { get; set; }
        public ICollection<CategoryDTO>? Children { get; set; }
        public ICollection<DishDTO>? Dishes { get; set; }
    }
}
