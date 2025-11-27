using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceDataAccess.Configurations
{
    public class SubCategoryConfiguration : IEntityTypeConfiguration<SubCategoryDTO>
    {
        public void Configure(EntityTypeBuilder<SubCategoryDTO> builder)
        {
            builder.ToTable("SubCategories");
            builder.HasKey(sc => sc.Id);
            builder.Property(sc => sc.NameEN).HasMaxLength(100);
            builder.Property(sc => sc.NameVN).HasMaxLength(100);
            builder.Property(sc => sc.Note).HasMaxLength(500);
            builder.Property(c => c.CreatedBy).HasMaxLength(100);
            builder.Property(c => c.ModifiedBy).HasMaxLength(100);
            builder.HasOne<CategoryDTO>(sc => sc.Category)
                .WithMany(c => c.SubCategories)
                .HasForeignKey(sc => sc.CategoryId);
        }
    }
}
