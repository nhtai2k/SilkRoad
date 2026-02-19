using Lipstick.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lipstick.DAL.Configurations
{
    public class SubCategoryConfiguration : IEntityTypeConfiguration<SubCategoryDTO>
    {
        public void Configure(EntityTypeBuilder<SubCategoryDTO> builder)
        {
            builder.ToTable("Table_SubCategories");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.NameEN).IsRequired().HasMaxLength(100);
            builder.Property(s => s.NameVN).IsRequired().HasMaxLength(100);
            builder.Property(s => s.IsActive).HasDefaultValue(false);
            builder.Property(s => s.IsDeleted).HasDefaultValue(false);
        }
    }
}
