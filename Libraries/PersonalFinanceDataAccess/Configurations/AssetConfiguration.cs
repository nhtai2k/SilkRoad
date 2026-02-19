using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalFinance.DAL.DTOs;

namespace PersonalFinance.DAL.Configurations
{
    public class AssetConfiguration : IEntityTypeConfiguration<AssetDTO>
    {
        public void Configure(EntityTypeBuilder<AssetDTO> builder)
        {
            builder.ToTable("Assets");
            builder.HasKey(i => i.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
            builder.Property(i => i.Amount)
                     .IsRequired()
                     .HasColumnType("decimal(18,2)");
            builder.Property(i => i.Date)
                        .IsRequired();
            builder.Property(i => i.Name).HasMaxLength(255);
            builder.Property(i => i.Note)
                           .HasMaxLength(1000);

            builder.HasOne(i => i.AssetType)
                .WithMany()
                   .HasForeignKey(i => i.TypeId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
