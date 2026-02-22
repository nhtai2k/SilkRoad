using System.ComponentModel.DataAnnotations.Schema;


namespace Stock.DAL.DTOs
{
    public class CoveredWarrantDTO : BaseDTO
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public required string Name { get; set; }
        public double Price { get; set; }
        public double Coefficient { get; set; }
        public double ExercisePrice { get; set; }
        public DateTime ExpirationDate { get; set; }
        [NotMapped]
        public double CurrentPrice { get; set; }
        [NotMapped]
        public double TotalPrice { get; set; }
        [NotMapped]
        public double TotalPercentage { get; set; } 
    }
}
