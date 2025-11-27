using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceDataAccess.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<CategoryDTO>
    {
        public void Configure(EntityTypeBuilder<CategoryDTO> builder)
        {
            builder.ToTable("Categories");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.NameEN).HasMaxLength(100);
            builder.Property(c => c.NameVN).HasMaxLength(100);
            builder.Property(c => c.Note).HasMaxLength(500);
            builder.Property(c => c.CreatedBy).HasMaxLength(100);
            builder.Property(c => c.ModifiedBy).HasMaxLength(100);
        }
    }
}
