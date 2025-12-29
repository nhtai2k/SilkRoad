using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BOMDataAccess.DTOs
{
    public class MaterialGroupDTO : BaseDTO
    {
        public int Id { get; set; }
        [Range(0, 255)]
        public int Priority { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Note { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
