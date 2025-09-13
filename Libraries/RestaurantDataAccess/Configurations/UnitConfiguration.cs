using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantDataAccess.DTOs;

namespace RestaurantDataAccess.Configurations
{
    public class UnitConfiguration : IEntityTypeConfiguration<UnitDTO>
    {
        public void Configure(EntityTypeBuilder<UnitDTO> builder)
        {
            builder.ToTable("Table_Units");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).IsRequired().HasMaxLength(255);
            builder.Property(s => s.NameVN).IsRequired().HasMaxLength(255);
            builder.Property(s => s.NameCN).IsRequired().HasMaxLength(255);
            builder.Property(s => s.Note).HasMaxLength(500);
            builder.HasIndex(s => s.NameEN).IsUnique();
        }
    }
}

