using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Restaurant.DAL.DTOs;

namespace Restaurant.DAL.Configurations
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
