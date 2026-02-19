using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOM.DAL.Configurations
{
    public class MaterialUnitConfiguration : IEntityTypeConfiguration<MaterialUnitDTO>
    {
        public void Configure(EntityTypeBuilder<MaterialUnitDTO> builder)
        {
            builder.ToTable("Table_MaterialUnits");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.Level).HasColumnType("tinyint");
            builder.HasOne(s => s.Parent)
                .WithMany(s => s.Children)
                .HasForeignKey(s => s.ParentId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete to avoid cycles
            builder.HasOne(s => s.Material)
                .WithMany(s => s.MaterialUnits)
                .HasForeignKey(s => s.MaterialId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
