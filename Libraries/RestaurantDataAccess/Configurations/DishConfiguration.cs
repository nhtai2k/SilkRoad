using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantDataAccess.DTOs;

namespace RestaurantDataAccess.Configurations
{
    internal class DishConfiguration : IEntityTypeConfiguration<DishDTO>
    {
        public void Configure(EntityTypeBuilder<DishDTO> builder)
        {
            builder.ToTable("TB_Dishes");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.NameEN).IsRequired().HasMaxLength(200);
            builder.Property(s => s.NameVN).IsRequired().HasMaxLength(200);
            builder.Property(s => s.DescriptionEN).HasMaxLength(1000);
            builder.Property(s => s.DescriptionVN).HasMaxLength(1000);
            builder.Property(s => s.ImageUrl).HasMaxLength(500);
            builder.Property(s => s.Note).HasMaxLength(500);
            builder.Property(s => s.Price).HasColumnType("decimal(18,2)");

            // Many-to-one relationship with Category
            builder.HasOne(d => d.Category)
                   .WithMany(c => c.Dishes)
                   .HasForeignKey(d => d.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
