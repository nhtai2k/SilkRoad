using BOM.DAL.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOM.DAL.Configurations
{
    public class BOMPropertyLinkConfiguration : IEntityTypeConfiguration<BOMPropertyLinkDTO>
    {
        public void Configure(EntityTypeBuilder<BOMPropertyLinkDTO> builder)
        {
            builder.ToTable("Table_BOMPropertyLinks");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.BOMCategoryId).IsRequired();
            builder.Property(s => s.PropertyId).IsRequired();
            builder.HasOne(s => s.BOMCategory)
                   .WithMany(s => s.BOMPropertyLinks)
                   .HasForeignKey(s => s.BOMCategoryId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
