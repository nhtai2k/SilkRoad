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
    public class CompanyConfiguration : IEntityTypeConfiguration<CompanyDTO>
    {
        public void Configure(EntityTypeBuilder<CompanyDTO> builder)
        {
            builder.ToTable("Table_Companies");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
