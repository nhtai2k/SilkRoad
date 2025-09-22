using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestaurantDataAccess.DTOs;

namespace RestaurantDataAccess.Configurations
{
    internal class ChatMessageConfiguration : IEntityTypeConfiguration<ChatMessageDTO>
    {
        public void Configure(EntityTypeBuilder<ChatMessageDTO> builder)
        {
            builder.ToTable("TB_ChatMessages");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Sender).IsRequired().HasMaxLength(100);
            builder.Property(s => s.Content).IsRequired().HasMaxLength(1000);
            builder.Property(s => s.RservationId).IsRequired();
        }
    }
}
