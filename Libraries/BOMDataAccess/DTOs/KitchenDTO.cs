using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace BOM.DAL.DTOs
{
    public class KitchenDTO : BaseDTO
    {
        public int Id { get; set; }
        public required string Code { get; set; }
        public required string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Note { get; set; }
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
