using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOMDataAccess.Configurations
{
    public class DishGroupConfiguration : IEntityTypeConfiguration<DishGroupDTO>
    {
        public void Configure(EntityTypeBuilder<DishGroupDTO> builder)
        {
            builder.ToTable("Table_DishGroups");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Code).IsRequired().HasMaxLength(255);
            builder.HasIndex(s => s.Code).IsUnique();
            builder.Property(s => s.Name).IsRequired().HasMaxLength(255);
            builder.Property(s => s.Note).HasMaxLength(500);
            builder.Property(s => s.ImagePath).HasMaxLength(255);
            builder.Property(s => s.Priority).HasColumnType("tinyint");
            // Self-referencing relationship for hierarchical structure
            builder
                .HasOne(s => s.Parent)
                .WithMany(s => s.Children)
                .HasForeignKey(s => s.ParentId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete to avoid cycles

        }
    }
}
