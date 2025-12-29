using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOMDataAccess.Configurations
{
    public class UnitGroupConfiguration : IEntityTypeConfiguration<UnitGroupDTO>
    {
        public void Configure(EntityTypeBuilder<UnitGroupDTO> builder)
        {
            builder.ToTable("Table_UnitGroups");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.HasIndex(s => s.Name).IsUnique();
            builder.Property(s => s.Priority).HasColumnType("tinyint");
            builder.Property(s => s.Note).HasMaxLength(500);
        }
    }
}