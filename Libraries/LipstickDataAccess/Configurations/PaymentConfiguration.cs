using LipstickDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LipstickDataAccess.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<PaymentDTO>
    {
        public void Configure(EntityTypeBuilder<PaymentDTO> builder)
        {
            builder.ToTable("Table_Payments");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();
            builder.Property(p => p.PaymentTypeId).HasColumnType("tinyint");
            builder.Property(s => s.SepayObject).HasMaxLength(1000);
            builder.Property(s => s.Note).HasMaxLength(500);
        }
    }
}
