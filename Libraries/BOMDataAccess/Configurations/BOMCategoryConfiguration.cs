using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOMDataAccess.Configurations
{
    public class BOMCategoryConfiguration : IEntityTypeConfiguration<BOMCategoryDTO>
    {
        public void Configure(EntityTypeBuilder<BOMCategoryDTO> builder)
        {
            builder.ToTable("Table_BOMCategories");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Priority).HasColumnType("tinyint");
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();
            builder.HasOne(s => s.BOM)
                   .WithMany(s => s.BOMCategories)
                   .HasForeignKey(s => s.BOMId)
                   .OnDelete(DeleteBehavior.Cascade);
            builder
               .HasOne(s => s.Parent)
               .WithMany(s => s.Children)
               .HasForeignKey(s => s.ParentId)
               .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete to avoid cycles
        }
    }
}
