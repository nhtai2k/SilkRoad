using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Survey.DAL.DTOs;

namespace Survey.DAL.Configurations
{
    public class StoreConfiguration : IEntityTypeConfiguration<StoreDTO>
    {
        public void Configure(EntityTypeBuilder<StoreDTO> builder)
        {
            builder.ToTable("Stores");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Name).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Address).HasColumnType("nvarchar(255)");
            builder.Property(s => s.Email).HasColumnType("nvarchar(255)");
            builder.Property(s => s.PhoneNumber).HasColumnType("varchar(10)");
            builder.Property(s => s.Representative).HasColumnType("nvarchar(255)");
        }
    }
}
