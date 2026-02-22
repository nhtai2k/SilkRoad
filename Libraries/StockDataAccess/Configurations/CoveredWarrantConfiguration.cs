using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Stock.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.DAL.Configurations
{
    public class CoveredWarrantConfiguration : IEntityTypeConfiguration<CoveredWarrantDTO>
    {
        public void Configure(EntityTypeBuilder<CoveredWarrantDTO> builder)
        {
            builder.ToTable("CoveredWarrants");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
        }
    }
}
