using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOMDataAccess.Configurations
{
    public class UnitConfiguration : IEntityTypeConfiguration<UnitDTO>
    {
        public void Configure(EntityTypeBuilder<UnitDTO> builder)
        {
            builder.ToTable("Table_Units");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.Property(s => s.Note).HasMaxLength(500);
            builder.Property(s => s.Symbol).IsRequired().HasMaxLength(50);
            builder.HasIndex(s => s.Symbol).IsUnique();
            builder.HasOne(s => s.UnitGroup)
                   .WithMany(g => g.Children)
                   .HasForeignKey(s => s.UnitGroupId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
