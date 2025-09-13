using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantDataAccess.DTOs
{
    public class DishDTO : BaseDTO
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int UnitId { get; set; }
        public int TypeId { get; set; }
        public required string NameEN { get; set; }
        public required string NameVN { get; set; }
        public required string NameCN { get; set; }
        public string? DescriptionEN { get; set; }
        public string? DescriptionVN { get; set; }
        public string? DescriptionCN { get; set; }
        public string? ImageUrl { get; set; }
        public string? Note { get; set; }
        public decimal Price { get; set; }
        public string? Quantity { get; set; }
        public int Priority { get; set; }
        public bool IsBestSeller { get; set; }
        public CategoryDTO? Category { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
