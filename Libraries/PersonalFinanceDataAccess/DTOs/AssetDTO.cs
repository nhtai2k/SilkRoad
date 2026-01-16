using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceDataAccess.DTOs
{
    public class AssetDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public int UserId { get; set; }
        public int TypeId { get; set; }
        public double Quantity { get; set; }
        public decimal Amount { get; set; }
        public bool HasLoan { get; set; }
        public decimal? LoanAmount { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public AssetTypeDTO? AssetType { get; set; }
        public AssetDTO()
        {
            CreatedAt = DateTime.Now;
            ModifiedAt = DateTime.Now;
        }
    }
}
