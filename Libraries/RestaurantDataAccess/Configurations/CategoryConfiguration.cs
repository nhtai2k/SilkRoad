using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantDataAccess.DTOs;

namespace RestaurantDataAccess.Configurations
{
    internal class CategoryConfiguration : IEntityTypeConfiguration<CategoryDTO>
    {
        public void Configure(EntityTypeBuilder<CategoryDTO> builder)
        {
            builder.ToTable("TB_Categories");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.NameEN).IsRequired();
            builder.Property(s => s.NameVN).IsRequired();
            builder.Property(s => s.Note).HasMaxLength(500);

            // Self-referencing relationship for Parent-Children
            builder.HasOne(c => c.Parent)
                   .WithMany(c => c.Children)
                   .HasForeignKey(c => c.ParentId)
                   .OnDelete(DeleteBehavior.Restrict);

            // One-to-many relationship with Dishes
            builder.HasMany(c => c.Dishes)
                   .WithOne(d => d.Category)
                   .HasForeignKey(d => d.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
