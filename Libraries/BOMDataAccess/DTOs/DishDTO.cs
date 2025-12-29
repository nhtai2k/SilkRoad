using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace BOMDataAccess.DTOs
{
    public class DishDTO : BaseDTO
    {
        public int Id { get; set; }
        public int DishGroupId { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? Note { get; set; }
        public string? ImagePath { get; set; }
        public DishGroupDTO? DishGroup { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
