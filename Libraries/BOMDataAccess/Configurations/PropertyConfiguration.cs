using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOM.DAL.Configurations
{
    public class PropertyConfiguration : IEntityTypeConfiguration<PropertyDTO>
    {
        public void Configure(EntityTypeBuilder<PropertyDTO> builder)
        {
            builder.ToTable("Table_Properties");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
            builder.HasIndex(s => s.Code).IsUnique();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.Property(s => s.ImagePath).HasMaxLength(255);
            builder.Property(s => s.Note).HasMaxLength(500);
        }
    }
}
