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
    public class IndustryConfiguration : IEntityTypeConfiguration<IndustryDTO>
    {
        public void Configure(EntityTypeBuilder<IndustryDTO> builder)
        {
            builder.ToTable("Table_Industries");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
