using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOM.DAL.Configurations
{
    public class DishConfiguration : IEntityTypeConfiguration<DishDTO>
    {
        public void Configure(EntityTypeBuilder<DishDTO> builder)
        {
            builder.ToTable("Table_Dishes");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
            builder.HasIndex(s => s.Code).IsUnique();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.Property(s => s.ImagePath).HasMaxLength(255);
            builder.Property(s => s.Note).HasMaxLength(500);
            builder.HasOne(s => s.DishGroup)
                .WithMany(s => s.Dishes)
                .HasForeignKey(s => s.DishGroupId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete to avoid cycles
        }
    }
}
