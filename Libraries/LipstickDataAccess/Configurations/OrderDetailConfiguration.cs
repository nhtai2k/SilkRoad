using LipstickDataAccess.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LipstickDataAccess.Configurations
{
    public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetailDTO>
    {
        public void Configure(EntityTypeBuilder<OrderDetailDTO> builder)
        {
            builder.ToTable("Table_OrderDetails");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()")
                .ValueGeneratedOnAdd();
            builder.HasOne(s => s.Order)
                .WithMany(s => s.OrderDetails)
                .HasForeignKey(s => s.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<OrderDTO>(s => s.Order).WithMany(g => g.OrderDetails).HasForeignKey(s => s.OrderId);
        }
    }
}
