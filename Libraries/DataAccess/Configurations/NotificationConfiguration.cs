using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.DAL.DTOs;

namespace System.DAL.Configurations
{
    internal class NotificationConfiguration : IEntityTypeConfiguration<NotificationDTO>
    {
        public void Configure(EntityTypeBuilder<NotificationDTO> builder)
        {
            builder.ToTable("Notifications");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).ValueGeneratedOnAdd();
        }
    }
}
