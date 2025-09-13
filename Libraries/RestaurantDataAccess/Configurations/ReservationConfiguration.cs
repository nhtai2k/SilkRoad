using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantDataAccess.DTOs;

namespace RestaurantDataAccess.Configurations
{
    internal class ReservationConfiguration : IEntityTypeConfiguration<ReservationDTO>
    {
        public void Configure(EntityTypeBuilder<ReservationDTO> builder)
        {
            builder.ToTable("TB_Reservations");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.FullName).IsRequired().HasMaxLength(100);
            builder.Property(s => s.PhoneNumber).HasMaxLength(20);
            builder.Property(s => s.NumberOfGuests).IsRequired();
            //builder.Property(s => s.ReservationDate).IsRequired();
            builder.Property(s => s.Note).HasMaxLength(500);
            //builder.Property(s => s.IsConfirmed).HasDefaultValue(false);
            builder.Property(s => s.HasCheckedOut).HasDefaultValue(false);
        }
    }
}
