using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;

namespace Stock.DAL.Configurations
{
    public class TradeHistoryConfiguration : IEntityTypeConfiguration<TradeHistoryDTO>
    {
        public void Configure(EntityTypeBuilder<TradeHistoryDTO> builder)
        {
            builder.ToTable("TradeHistories");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
