using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockDataAccess.Configurations
{
    public class StockPriceConfiguration : IEntityTypeConfiguration<StockPriceDTO>
    {
        public void Configure(EntityTypeBuilder<StockPriceDTO> builder)
        {
            builder.ToTable("Table_StockPrices" +
                "");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.HasOne(s => s.Company)
                .WithMany(c => c.StockHistories)
                .HasForeignKey(s => s.CompanyId);
        }
    }
}
