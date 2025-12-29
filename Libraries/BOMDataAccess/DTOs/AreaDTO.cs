//using DataAccess.DTOs;
//using Microsoft.AspNetCore.Http;
//using System.ComponentModel.DataAnnotations.Schema;

//namespace DataAccess.BOMDTOs
//{
//    public class AreaDTO : BaseDTO
//    {
//        public int Id { get; set; }
//        public int LocationId { get; set; }
//        public int? TimeUnitId { get; set; }
//        public required string Code { get; set; }
//        public required string Name { get; set; }
//        public string? Note { get; set; }
//        public double AreaSize { get; set; }
//        public double? Rent { get; set; }
//        public string? ImagePath { get; set; }
//        public LocationDTO? Location { get; set; }
//        [NotMapped]
//        public IFormFile? ImageFile { get; set; }
//    }
//}
