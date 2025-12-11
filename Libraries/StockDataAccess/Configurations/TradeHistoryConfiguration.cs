using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace StockDataAccess.Configurations
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
