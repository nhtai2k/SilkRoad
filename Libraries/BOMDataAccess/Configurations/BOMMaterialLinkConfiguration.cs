using BOMDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BOMDataAccess.Configurations
{
    public class BOMMaterialLinkConfiguration : IEntityTypeConfiguration<BOMMaterialLinkDTO>
    {
        public void Configure(EntityTypeBuilder<BOMMaterialLinkDTO> builder)
        {
            builder.ToTable("Table_BOMMaterialLinks");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();
            builder.Property(s => s.BOMCategoryId).IsRequired();
            builder.Property(s => s.MaterialId).IsRequired();
            builder.Property(s => s.Quantity).IsRequired();
            builder.HasOne(s => s.BOMCategory)
                   .WithMany(s => s.BOMMaterialLinks)
                   .HasForeignKey(s => s.BOMCategoryId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
