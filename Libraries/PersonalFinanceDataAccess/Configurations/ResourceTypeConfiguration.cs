using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinanceDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinanceDataAccess.Configurations
{
    public class ResourceTypeConfiguration : IEntityTypeConfiguration<ResourceTypeDTO>
    {
        public void Configure(EntityTypeBuilder<ResourceTypeDTO> builder)
        {
            builder.ToTable("ResourceTypes");
            builder.HasKey(i => i.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(i => i.Name).HasMaxLength(255);
        }
    }
}
