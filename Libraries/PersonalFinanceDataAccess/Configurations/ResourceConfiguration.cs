using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceDataAccess.Configurations
{
    public class ResourceConfiguration : IEntityTypeConfiguration<ResourceDTO>
    {
        public void Configure(EntityTypeBuilder<ResourceDTO> builder)
        {
            builder.ToTable("Resources");
            builder.HasKey(i => i.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(i => i.Amount)
                     .IsRequired()
                     .HasColumnType("decimal(18,2)");
            builder.Property(i => i.Date)
                        .IsRequired();
            builder.Property(i => i.Note)
                           .HasMaxLength(500);

            builder.HasOne(i => i.ResourceType)
                .WithMany()
                   .HasForeignKey(i => i.TypeId)
                   .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
