using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;

namespace Stock.DAL.Configurations
{
    public class StockPriceConfiguration : IEntityTypeConfiguration<StockPriceDTO>
    {
        public void Configure(EntityTypeBuilder<StockPriceDTO> builder)
        {
            builder.ToTable("StockPrices");
            //set multiple properties as composite key
            builder.HasKey(s => new { s.CompanyId, s.Date });
            builder.HasOne(s => s.Company)
                .WithMany(c => c.StockHistories)
                .HasForeignKey(s => s.CompanyId);
        }
    }
}
